const User = require('../models/User');

module.exports= (req,res,next)=>{
    console.log("inside defaultcheck");
    User.findOne({username:req.session.user.username},(error,user)=>{
        console.log(error);
        if(!error){
            console.log("middleWare: "+user);
            console.log("in default: "+user.LicenseNo);
            if(user.LicenseNo === 'default'){
                console.log("in default: "+user.LicenseNo);
                return res.render('g2_test');
            }
        }  
        next()
    });
}