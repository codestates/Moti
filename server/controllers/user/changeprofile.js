const model = require('../../models');
const fs = require('fs');

module.exports = async (req,res) =>{
    let {username,profile} = req.body;

    const accesstoken = req.headers.authorization.split(' ')[1]; 
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