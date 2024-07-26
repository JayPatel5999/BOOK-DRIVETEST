const mongoose= require('mongoose');

const schema= mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const AppointmentSchema= new schema({
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true,
    },
    examiner:{
        type:String,
        default:'none',
    },
    isTimeSlotAvailable:{
        type:Boolean,
        default:true
    }
})

AppointmentSchema.index({ date: 1, time: 1}, { unique: true });

AppointmentSchema.plugin(uniqueValidator);

const Appointment= mongoose.model('AppointmentCollection',AppointmentSchema);

module.exports= Appointment;