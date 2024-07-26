const User= require('../models/User');

module.exports= async (req,res)=>{
    const CurrDriver= User.find(
        req.body,
        (error,driver)=>{
            if(error==null){
                res.render('g_test',{driver:driver[0]})
            }
            else{
                res.render('g_test',{error:true})
            }
            console.log(error,driver);
            
        }
    )
    // console.log("Onfo: "+JSON.stringify(CurrDriver));
    // res.render('g_test');

}