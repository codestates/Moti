const { Post } = require('../../models');

module.exports = (req, res) => {
    try {
        const authorization = req.headers['authorization'];
        if(!authorization){
            res.status(400).json({message : '유효한 회원이 아닙니다.'})
        }else{
            const post_id = req.body.post_id;
            Post.destroy({
                where : {
                    id : post_id
                }
            })
            .then((result) => {
                res.status(400).json({message : '삭제 성공'})
            })
            .catch((e) => {
                res.status(400).json({message : '삭제 실패 다시 시도해주세요'})
            })
        }
    } catch (error) {
        res.status(400).json({message : '삭제 실패 다시 시도해주세요'})
    }
}