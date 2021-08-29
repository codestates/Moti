require('dotenv').config();
const model = require('../../models');
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require('axios');

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
        let user = await model.user.findOne({where : {id: gitInfo.data.id}});

        if(user){
          console.log("가입되어있는 git id. 바로 로그인 진행")
        }
        else{
          console.log("첫 로그인 git, DB 저장 후 로그인 진행")
          model.user.create({
            id : gitInfo.data.id,
            username : gitInfo.data.login,
          })

        }
        // let blob_image;
        // fetch(gitInfo.data.avatar_url)
        // .then(res => res.blob()) // Gets the response and returns it as a blob
        // .then(blob => {
        //   // Here's where you get access to the blob
        //   // And you can use it for whatever you want
        //   // Like calling ref().put(blob)

        //   // Here, I use it to make an image appear on the page
        //   // let objectURL = URL.createObjectURL(blob);
        //   // let myImage = new Image();
        //   // myImage.src = objectURL;
        //   // document.getElementById('myImg').appendChild(myImage)
        //   blob_image = blob;
        // });

        // res.status(200).json({ accessToken: accessToken })
        res.json({data : {
          accessToken : accessToken, 
          username : gitInfo.data.login,
          profile : gitInfo.data.avatar_url,
          RandomAdvice : advice.dataValues.advice
      }, message : 'login ok'});
    
      }).catch(e => {
        res.status(404)
      })
};