const { Post, emotion, Post_emotion } = require('../../models')
const fs = require('fs');
const { isAuthorized } = require('../tokenFunctions')

module.exports =  async (req, res) => {
    const authorization = req.headers['authorization'];
    if(!authorization){
        res.status(401).json({message : '유효한 회원이 아닙니다.'});
    }else{
        let image = fs.readFileSync(req.file.path); //blob형태로 변환, 안 되면 고쳐야 됨. 진짜 사진이 출력 되는지는 프론트 엔드랑 같이 봐야 할 듯
        let {emotionstate, content} = req.body;
        const token = authorization.split(' ')[1];
        const userInfo = isAuthorized(token);

        //Post, emotion, join table 데이터 insert하기
        let PostResult = await Post.create({
            content : content,
            picture : image,
            user_Id : userInfo.id
        });

        let emotionResult = await emotion.create({
            emotion : emotionstate
        });

        let jointable = await Post_emotion.create({
            Post_Id : PostResult.dataValues.id,
            emotion_Id : emotionResult.dataValues.id
        });

        res.status(200).json({message : '업로드 성공'})
    }
}