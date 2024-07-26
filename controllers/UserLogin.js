const bcrypt = require('bcrypt');
const User= require('../models/User');
const session=require('express-session')

module.exports= (req,res)=>{
    const {username,password}=req.body;
    console.log(username)
    console.log(password)
    User.findOne({username:username},(error,user)=>{
        if(user){
            bcrypt.compare(password,user.password,(error,same)=>{
                console.log(error);
                if(same){//if Password match
                    //session will be applied in the future
                    req.session.user=user;
                    console.log(req.session.user)
                    // req.session.userType=user.userType;

                    res.redirect('/')
                }
                else{
                    res.redirect('/login')
                }
            });
        }
        else{
            res.redirect('/signup')
        }
    })
}
