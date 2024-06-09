const moment = require('moment/moment');
const Appointment = require('../models/Appointment');
const { json } = require('body-parser');

module.exports = async (req, res) => {

    const appointments = await Appointment.find({isTimeSlotAvailable:true}).lean();

   const Appointmentdata= appointments.map(appointment => {
        console.log(appointment.date);
        appointment.date.setTime(appointment.date.getTime() + appointment.date.getTimezoneOffset()*60*1000);
        let Formatdate = moment(appointment.date).format('YYYY-MM-DD');
        console.log("appointment._id "+appointment._id);
        return{
            id: appointment._id,
            title: appointment.time,
            start: Formatdate,
        };
    });
    console.log("appointments "+JSON.stringify(Appointmentdata));
    res.json(Appointmentdata)

}