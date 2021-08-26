const { Post, emotion, Post_emotion } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
        const authorization = req.headers['authorization'];
        if(!authorization){
            res.status(400).json({message : '유효한 회원이 아닙니다.'})
        }else{
            //let userId = req.body.user_id;
            const token = authorization.split(' ')[1];
            const userId = isAuthorized(token);
            const num = userId.id;

            Post.findAll({
               attributes : ['content', 'picture'],
               include : [
                   {
                       model : Post_emotion,
                       required : true
                   }
               ]
            })
            .then((result) => {
                console.log(result);
            })
        }
    
}