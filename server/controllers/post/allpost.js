const { Post, emotion, Post_emotion } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
        const authorization = req.headers['authorization'];
        if(!authorization){
            res.status(401).json({message : '유효한 회원이 아닙니다.'})
        }else{
            const token = authorization.split(' ')[1];
            const userId = isAuthorized(token);
            const num = userId.id;
            const arr = [];
            let obj = {};

            Post.findAll({
                attributes : ['content', 'picture', 'createdAt'],
                include : [{
                    model: Post_emotion,
                    required: true,
                    attributes : ['Post_Id', 'emotion_Id'],
                    include : [{
                        model: emotion,
                        required: true,
                        attributes: ['emotion']
                    }]
                }],
                where : {
                    user_Id:  num
                }
            })
            .then((result) => {
                for(let i=0; i<result.length; i++){
                   obj['content'] = result[i].dataValues.content;
                   obj['picture'] = result[i].dataValues.picture;
                   obj['createdAt'] = result[i].dataValues.createdAt;
                   obj['emotion'] = result[i].dataValues.Post_emotions[0].dataValues.emotion.dataValues.emotion;
                   arr.push(obj);
                   obj = {};
                }
               //console.log(arr);
                res.status(200).json({AllPosts : arr});
            })
        }
    
}