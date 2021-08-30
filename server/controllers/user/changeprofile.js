const model = require('../../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { isAuthorized, remakeToken } = require('../tokenFunctions')
module.exports = async (req,res) =>{
    let {username,profile} = req.body;

    const accesstoken = req.headers.authorization.split(' ')[1]; 
    if(isAuthorized(accesstoken) === 'jwt expired'){
        token = remakeToken(req);
        res.set('accessToken', token); //헤더 설정
    }

    const data = jwt.verify(accesstoken, process.env.ACCESS_SECRET);

    if(profile === 'default_profile'){
        profile = fs.readFileSync(
            __basedir + "/resources/assets/tmp/bros_blank.jpg"
        )
    }
    await model.user.update({ profile: profile, username: username }, {
        where: {
          email: data.email
        }
    });

    res.status(200).send('profile changed successfully')
}