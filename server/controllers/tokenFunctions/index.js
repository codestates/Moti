require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
    generateAccessToken: (data) => {
        delete data.profile;
        const access_token = sign(data, process.env.ACCESS_SECRET, {expiresIn: 6000});
        return access_token;
    },

    generateRefreshToken: () => {
        const refresh_token = sign({}, process.env.REFRESH_SECRET, {expiresIn : 60*60*24*7});
        return refresh_token;
    },
    isAuthorized: (token) => {
        const data = verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
            if(err){
                throw err;
            }else{
                return decoded;
            }
        })
        return data;
    }
}