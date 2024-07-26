module.exports= async (req,res)=>{
    res.render('bookG2Appoinment',{AppointmentError:req.flash('AppointmentError'),AppointmentSuccess:req.flash('AppointmentSuccess')});
}
