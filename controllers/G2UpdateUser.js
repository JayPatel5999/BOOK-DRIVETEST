const User = require('../models/User');

module.exports = async (req, res) => {
    User.findOneAndUpdate({username:req.session.user.username},req.body,{new:true},(error,driver)=>{
        console.log("error in g2 update: "+ JSON.stringify(req.body));
        if(!error){
            req.session.user=driver;
            console.log("session.user.username: "+driver);
            res.redirect('/');   
        }else{
            res.redirect('/g2_test');
        }
    });
}