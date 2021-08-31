const model = require('../../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { isAuthorized, remakeToken } = require('../tokenFunctions')
module.exports = async (req,res) =>{
    let {username} = req.body;
    let image;
    console.log(req);
    console.log(username);
    const accesstoken = req.headers.authorization.split(' ')[1]; 
    if(isAuthorized(accesstoken) === 'jwt expired'){
        token = remakeToken(req);
        res.set('accessToken', token); //헤더 설정
    }

    const data = jwt.verify(accesstoken, process.env.ACCESS_SECRET);
    
    if(req.body.picture === ''){//유저가 기본 이미지로 바꾸고 싶어함
        image = fs.readFileSync(
            __basedir + "/resources/assets/tmp/bros_blank.jpg"
        )
    }
    else if(req.file === undefined){ //유저가 이미지 수정을 원치 않음
        image = null
    }
    else{
        image = fs.readFileSync(req.file.path);
    }

    
    await model.user.update({ profile: image, username: username }, {
        where: {
          email: data.email
        }
    });

    res.status(200).send('profile changed successfully')
}