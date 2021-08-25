require('dotenv').config();

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require('axios');

module.exports = (req,res)=>{

    console.log(req.body.authorizationCode);
    console.log(clientID);
    console.log(clientSecret);

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
      }).then((response) => {
        accessToken = response.data.access_token;
        //console.log(response);
        res.status(200).json({ accessToken: accessToken })
    
      }).catch(e => {
        res.status(404)
      })
};