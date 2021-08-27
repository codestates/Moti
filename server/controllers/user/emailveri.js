const bcrypt = require('bcrypt');

module.exports =(req,res)=>{
    const {code} = req.query;
    const {emailcode} = req.body;
    
    bcrypt.compare(code,emailcode)
    .then((isMatch)=>{
        if(!isMatch){
            res.status(401).send("code mismatch!");
        }else{
            res.status(200).send("success!")
        }
    })
}