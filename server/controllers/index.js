module.exports = {
    signin: require('./user/signin'),
    oauthgit: require('./user/oauthgit'),
    signup: require('./user/signup'),
    changepassword: require('./user/changepassword'),
    changeprofile: require('./user/changeprofile'),
    signout: require('./user/signout'),
    upload: require('./post/upload'),
    delete: require('./post/delete'),
    allposts: require('./post/allpost'),
    getemailcode: require('./user/getemailcode'),
    emailveri: require('./user/emailveri'),
    partofposts : require('./post/PartofPosts')
}