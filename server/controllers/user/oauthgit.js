require('dotenv').config();
const model = require('../../models');
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require('axios');
const { generateAccessToken, generateRefreshToken} = require('../tokenFunctions');

module.exports = async (req,res)=>{

    console.log(req.body.authorizationCode);
    console.log(clientID);
    console.log(clientSecret);
    const advice = await model.RandomAdvice.findOne({where : {id : 1}}); 
    
    //나중에 명언 dummy 넣고 랜덤 난수로찾기. client에서 받지말고 그냥 여기서 난수 생성

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token`,
        headers: {
          accept: 'application/json',
        },
        data: {
            client_id: clientID,
            client_secret: clientSecret,
            code: req.body.authorizationCode
          }
      }).then(async (response) => {
        accessToken = response.data.access_token;
        let gitInfo = await axios.get('https://api.github.com/user',
        {
          headers:{authorization: `token ${accessToken}`}
        })  
        //console.log(gitInfo.data)
        const db_username = 'git/'+gitInfo.data.login;
        let user = await model.user.findOne({where : {username: db_username}});

        if(user){
          console.log("가입되어있는 git id. 바로 로그인 진행")
        }
        else{
          console.log("첫 로그인 git, DB 저장 후 로그인 진행")
          model.user.create({
            username : db_username,
          })

        }
        
        const userInfo = await user.findOne({attributes: ['id', 'email', 'username'], where: {username: db_username}});
        const access_token = generateAccessToken(userInfo.dataValues);
        const refresh_token = generateRefreshToken(userInfo.dataValues);
        res.cookie('RefreshToken', refresh_token, {httpOnly: true, sameSite: 'none', secure: true});

        res.json({data : {
          accessToken : access_token, 
          username : gitInfo.data.login,
          profile : gitInfo.data.avatar_url,
          RandomAdvice : advice.dataValues.advice,
          author : advice.dataValues.author
      }, message : 'login ok'});
    
      }).catch(e => {
        res.status(404)
      })
};