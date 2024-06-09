const User= require('../models/User');
const Appointment= require('../models/Appointment');

module.exports= async (req,res)=>{
    console.log("session.user.username: "+req.session.user.username);
    User.findByIdAndUpdate(req.body._id,req.body,{new:true},(error,driver)=>{
        console.log("error in g2 update: "+ JSON.stringify(req.body));
        if(!error)
        {
            req.session.user=driver;
            console.log("session.user.username: "+driver);
            res.redirect('/g2_test'); 
            Appointment.findByIdAndUpdate(req.body.appointmentId,{isTimeSlotAvailable:false},{new:true},(error,appointment)=>{
                if(error)
                {
                    console.log("ERROR : "+error);
                }
            }) ;
        }
        else
        {
            res.redirect('/');
        }
    });
}