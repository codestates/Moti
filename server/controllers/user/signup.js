const model = require('../../models');
const fs = require('fs');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    let {username, email, password} = req.body;
    //let profile = "data:image/png;base64,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"
    let profile = fs.readFileSync(
        __basedir + "/resources/assets/tmp/bros_blank.jpg"
    )

    let user = await model.user.findOne({where : {email: email}});
    if(user){
        res.status(409).json({message : '이미 존재하는 이메일입니다.'});
    }else{
        try {
            
           bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(password, salt, (err, hash) => {
                   if(err){
                       throw err;
                   }else{
                        model.user.create({
                            username : username,
                            password : hash,
                            email : email,
                            profile : profile
                        })
                        .then((result) => {
                            res.status(201).json({
                                id : result.dataValues.id,
                                username : result.dataValues.username,
                                email : result.dataValues.email,
                                createdAt: result.dataValues.createdAt
                            })
                        })
                   }

               })
           })
        } catch (error) {
            console.log(error);
        }
    }
}