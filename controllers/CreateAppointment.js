const appointment= require('../models/Appointment');

module.exports= (req,res)=>{
    appointment.create(req.body,(error,appointment)=>{
        if(error){
            console.log("error "+ error);
            console.log("error.errors "+ JSON.stringify(error.errors));
            Object.keys(error.errors).forEach(key => req.flash('AppointmentError', error.errors[key].message));
            res.redirect('/appointment');
        }else{
            console.log("req.body "+JSON.stringify(req.body));
            req.flash('AppointmentSuccess',true);
            res.redirect('/appointment');
        }
    })
}