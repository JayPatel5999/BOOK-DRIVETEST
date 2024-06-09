const User = require('../models/User');

module.exports = async(req,res) => {
    const CurrentDriver = User.find(
        req.body, 
        (error, driver)=>{
            if(error==null){
                res.render('g_test',{driver:driver[0]})
            }
            else{
                res.render("g_test",{error:true})
            }
            console.log(error,driver);
        }
    )
}