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
    const advice = await model.RandomAdvice.findOne({where : {id : 1}});
    
    if(isAuthorized(accesstoken) === 'jwt expired'){
        token = remakeToken(req);
        res.set('accessToken', token); //헤더 설정
    }

    const data = jwt.verify(accesstoken, process.env.ACCESS_SECRET);
    let user = await model.user.findOne({where : {email: data.email}});

    
    if(req.body.picture === 'default_profile'){//유저가 기본 이미지로 바꾸고 싶어함
        image = fs.readFileSync(
            __basedir + "/resources/assets/tmp/bros_blank.jpg"
        )
    }
    else if(req.body.picture === ''){ //유저가 이미지 수정을 원치 않음
        image = user.dataValues.profile;
    }
    else{
        image = fs.readFileSync(req.file.path);
    }

    if(username === '' || username === 'undefined'){
        username = user.dataValues.username;
    }
    await model.user.update({ profile: image, username: username }, {
        where: {
          email: data.email
        }
    });

    res.json({data : {
        accessToken : accesstoken, 
        username : username,
        profile : image,
        RandomAdvice : advice.dataValues.advice,
        author : advice.dataValues.author
    }, message : 'profile changed ok'});

}