const User = require('../models/User')
module.exports = (req, res, next) => { 
    if(req.session.user){
        if(req.session.user.usertype!='Examiner'){
            return res.redirect('/')
        }
    } 
    else{
        return res.redirect('/login')
    }
    next();
}