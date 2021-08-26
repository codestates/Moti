const bcrypt = require('bcrypt');
const model = require('../../models');
const jwt = require('jsonwebtoken');
const { generateAccessToken} = require('../tokenFunctions');

module.exports =  (req, res) =>{
    let {nowpassword, newpassword} = req.body;
    const accesstoken = req.headers.authorization.split(' ')[1];
    
    const data = jwt.verify(accesstoken, process.env.ACCESS_SECRET);
    
    bcrypt.compare(nowpassword,data.password).then((isMatch)=>{
        if(!isMatch){
            res.status(401).send('password mismatch');
        }
        else{
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newpassword,salt,async (err,hash)=>{
                    if(err){
                        throw err;
                    }
                    else{
                        console.log(hash);
                        await model.user.update({ password: hash }, {
                            where: {
                              email: data.email
                            }
                        });
                        

                        res.status(200).send('password changed successfully')
                    }
                })
            })
        }
    })
}