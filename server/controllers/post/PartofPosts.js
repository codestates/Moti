const { Post, emotion, Post_emotion } = require('../../models');
const { isAuthorized, remakeToken } = require('../tokenFunctions');
module.exports = (req, res) => {
    const authorization = req.headers['authorization'];
        if(!authorization){
            res.status(401).json({message : '유효한 회원이 아닙니다.'})
        }else{
            let token = authorization.split(' ')[1];
            let userInfo; 

            if(isAuthorized(token) === 'jwt expired'){
                token = remakeToken(req);
                res.set('accessToken', token); //헤더 설정 
            }

            userInfo = isAuthorized(token);

            const num = userInfo.id;
            const arr = [];
            let obj = {};
            let emotionParam = req.params.emotion;

            Post.findAll({
                attributes : ['id', 'content', 'picture', 'createdAt'],
                include : [{
                    model: Post_emotion,
                    required: true,
                    attributes : ['Post_Id', 'emotion_Id'],
                    include : [{
                        model: emotion,
                        required: true,
                        attributes: ['emotion'],
                        where : {
                            emotion : emotionParam
                        }
                    }]
                }],
                where : {
                    user_Id:  num
                }
            })
            .then((result) => {
                for(let i=0; i<result.length; i++){
                    obj['id'] = result[i].dataValues.id; //id 추가
                    obj['content'] = result[i].dataValues.content;
                    obj['picture'] = result[i].dataValues.picture;
                    obj['createdAt'] = result[i].dataValues.createdAt;
                    obj['emotion'] = result[i].dataValues.Post_emotions[0].dataValues.emotion.dataValues.emotion;
                    arr.push(obj);
                    obj = {};
                 }
                 res.status(200).json({emotionPosts : arr});
            })
        }
}