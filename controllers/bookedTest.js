const User = require('../models/User');
const Appointment = require('../models/Appointment');
const moment = require('moment/moment');

module.exports= async (req,res)=>{

    const users= await User.find({appointmentBooked:true}).lean();
    console.log("users.length "+users.length);
    const appointmentIds=  users.map(user=>user.appointmentId);
    console.log("appointmentIds "+appointmentIds);
    const appointments=await Appointment.find({_id:{$in:appointmentIds}}).lean();
    // let Formatdate = moment(appointments.date).format('YYYY-MM-DD');
    // appointments.date=Formatdate;
    appointments.forEach(appointment=>{appointment.date=moment(appointment.date).format('YYYY-MM-DD')});

    users.forEach(user=>{user.appointment=appointments.find(appointment=>String(appointment._id)===String(user.appointmentId))});

    req.session.users=users;
    // req.session.appointments=appointments;
    res.locals.users=users;
    // res.locals.appointments=appointments;


    console.log("appointments "+JSON.stringify(appointments));
           
    console.log("users out side "+JSON.stringify(users));
    res.render('bookedTest');

}
