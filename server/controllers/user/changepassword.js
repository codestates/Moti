const bcrypt = require('bcrypt');
const model = require('../../models');
const jwt = require('jsonwebtoken');
const { isAuthorized, remakeToken } = require('../tokenFunctions')


module.exports =  async (req, res) =>{
    let {nowpassword, newpassword} = req.body;
    const accesstoken = req.headers.authorization.split(' ')[1];
    
    const data = jwt.verify(accesstoken, process.env.ACCESS_SECRET);
    let user = await model.user.findOne({where : {email: data.email}});
    if(isAuthorized(accesstoken) === 'jwt expired'){
        token = remakeToken(req);
        res.set('accessToken', token); //헤더 설정
    }

    bcrypt.compare(nowpassword,user.dataValues.password).then((isMatch)=>{ //여기 수정 요망
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