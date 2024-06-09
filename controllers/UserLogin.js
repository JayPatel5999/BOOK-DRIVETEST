const bcrypt = require('bcrypt')
const User = require('../models/User')
const session = require('express-session');

module.exports = (req, res) => {
    
    const {username, password} = req.body;

    User.findOne({username:username}, (error,user) =>{
        if(user)
        {
            bcrypt.compare(password, user.password, (error, same) =>{
                if(same)
                {
                    req.session.user=user;
                    res.redirect('/');
                }
                else
                {
                    res.redirect('/login')
                }
            })
        }
        else
        {
            res.redirect('/signup')
        }
    })
}