const Appointment = require('../models/Appointment');
module.exports = async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    console.log(JSON.stringify(appointment));
    res.json(appointment)
}