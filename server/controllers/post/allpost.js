const { Post, emotion, Post_emotion } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
        const authorization = req.headers['authorization'];
        if(!authorization){
            res.status(400).json({message : '유효한 회원이 아닙니다.'})
        }else{
            //let userId = req.body.user_id;
            const token = authorization.split(' ')[1];
            const userId = isAuthorized(token);
            const num = userId.id;

            Post.findAll({
                attributes : ['content', 'picture', 'createdAt'],
                include : [{
                    model: Post_emotion,
                    required: true,
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
               // console.log(result[0].dataValues);
                console.log(result[0].dataValues.Post_emotions[0].dataValues.emotion.dataValues.emotion); //이렇게 해야 emotion이 나옴
            })
        }
    
}