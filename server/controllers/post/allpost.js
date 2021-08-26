const { Post, emotion, Post_emotion } = require('../../models');

module.exports = (req, res) => {
    try {
        const authorization = req.headers['authorization'];
        if(!authorization){
            res.status(400).json({message : '유효한 회원이 아닙니다.'})
        }else{
            let userId = req.body.user_id;

            Post.findAll({
               include: [
                   {
                       model : Post_emotion,
                       include : [
                           {
                              model : emotion
                           }
                       ]
                   }
               ],
               where: {
                   [`$Post.user_Id`] : userId
               }
            })
            .then((result) => {
                console.log(result);
            })
        }
    } catch (error) {
        
    }
}