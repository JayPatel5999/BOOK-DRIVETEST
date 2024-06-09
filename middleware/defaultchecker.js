const User = require('../models/User');
module.exports= (req,res,next)=>{
    User.findOne({username:req.session.user.username},(error,user)=>{
        if(!error)
        {
            if(user.licenseNo === 'default')
            {
                console.log("in default: "+user.licenseNo);
                return res.render('g2_test');
            }
        }  
        next()
    });
}