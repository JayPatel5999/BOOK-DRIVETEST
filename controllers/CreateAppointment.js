const appointment= require('../models/Appointment');

module.exports= (req,res)=>{
    appointment.create(req.body,(error,Appointment)=>{
        if(error){
            console.log("error.errors "+ JSON.stringify(error.errors));
            Object.keys(error.errors).forEach(key => req.flash('AppointmentError', error.errors[key].message));
            res.redirect('/Appointment');
        }else{
            console.log("req.body "+JSON.stringify(req.body));
            res.redirect('/Appointment');
        }
    })
}