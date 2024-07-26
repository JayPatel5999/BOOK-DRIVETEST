const User = require('../models/User');
module.exports= async(req,res)=>{

    console.log("req.body "+JSON.stringify(req.body));
    req.body.appointmentBooked=false;
    req.body.appointmentId=null;
    User.findByIdAndUpdate(req.body.id, req.body,{new:true} ,function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
        }
    });
    res.redirect('/roadTest');
}