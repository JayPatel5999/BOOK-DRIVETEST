const User= require('../models/User');

module.exports= async (req,res)=>{
    //await User.save(req.body)
    
    await User.findByIdAndUpdate(req.body.id,req.body)
    //updateUser.$isNew=false;
    //  updateUser.save();
    var updateUser= await User.find({LicenseNo:req.body.LicenseNo}) 
    console.log('updateUser: '+req.body.LicenseNo);
    
    res.render('g_test',{driver:updateUser[0]});
}