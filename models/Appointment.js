const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const AppointmentSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        unique:true
    },
    isTimeSlotAvailable : {
        type: Boolean,
        default: true
    }
})

AppointmentSchema.index({ date: 1, time: 1}, { unique: true })
AppointmentSchema.plugin(uniqueValidator);
const Appointment = mongoose.model('Appointment',AppointmentSchema);
module.exports = Appointment;