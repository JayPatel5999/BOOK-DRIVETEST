const User= require('../models/User');

module.exports= async (req,res)=>{
    
    await User.findByIdAndUpdate(req.body.id,req.body)
    var updateUser= await User.find({licenseNo:req.body.licenseNo}) 
    console.log('updateUser: '+req.body.licenseNo);
    res.render('g_test',{Driver:updateUser[0]});
}