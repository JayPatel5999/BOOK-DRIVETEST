module.exports= async (req,res)=>{
    res.render('bookGAppoinment',{AppointmentError:req.flash('AppointmentError'),AppointmentSuccess:req.flash('AppointmentSuccess')});
}
