const { user, RandomAdvice } = require('../../models');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken} = require('../tokenFunctions');

module.exports = async (req, res) => {
    try {
        //const userInfo = await user.findOne({attributes: ['email', 'password', 'profile'], where: {email: req.body.email, password: req.body.password}});
        const userInfo = await user.findOne({attributes: ['email', 'username', 'password', 'profile'], where: {email: req.body.email}});
        const advice = await RandomAdvice.findOne({where : {id : req.body.adviceID}});

        if(!userInfo){
            return res.status(404).json({message : 'user Not found'});
        }

        bcrypt.compare(req.body.password, userInfo.dataValues.password).then((isMatch) => {
            if(!isMatch){
                return res.status(404).json({message : 'user Not found'});
            }else{
                const access_token = generateAccessToken(userInfo.dataValues);
                const refresh_token = generateRefreshToken();

                res.cookie('RefreshToken', refresh_token, {httpOnly: true, sameSite: 'none', secure: true});
                res.json({data : {
                    accessToken : access_token, 
                    username : userInfo.dataValues.username,
                    profile : userInfo.dataValues.profile,
                    RandomAdvice : advice.dataValues.advice
                }, message : 'login ok'});
            }
        })
        // if(!userInfo){
        //     res.status(404).json({message : 'user Not found'});
        // }else{
        //     const access_token = generateAccessToken(userInfo.dataValues);
        //     const refresh_token = generateRefreshToken();

        //     res.cookie('RefreshToken', refresh_token, {httpOnly: true, sameSite: 'none', secure: true});
        //     res.json({data : {
        //         accessToken : access_token, 
        //         username : userInfo.dataValues.username,
        //         profile : userInfo.dataValues.profile,
        //         RandomAdvice : advice.dataValues.advice
        //     }, message : 'login ok'});
        // }
    } catch (error) {
        console.log(error);
    }

}