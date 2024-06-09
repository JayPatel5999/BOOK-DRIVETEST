const User = require('../models/User');

module.exports = async(req,res)=> {
    await User.create(req.body, (error, user) => {
        if (error) {
            console.log("req.body "+JSON.stringify(req.body));
            req.flash('RegError',Object.keys(error.errors).map(key => error.errors[key].message));
            res.redirect('/signup');
        }
        else{
            console.log("req.body "+JSON.stringify(req.body));
            res.redirect('/login');
        }
    });
}