module.exports = (req, res) => {
    const authorization = req.headers['authorization'];
    if(!authorization){
        res.status(400).json({message : 'you are currently not logined'});
    }else{
        res.clearCookie('RefreshToken')
        res.status(200).json({message : 'successfully signed out'});
    }
}