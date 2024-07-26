const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const Schema= mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

const UserSchema= new Schema(
    {
        username    : {
            type: String,
            required: true,
            unique: true
        },
        firstname   : {
            type: String,
            required: true,
            default: 'default'
        },
        password    : {
            type:String,
            required:true
        }
        ,
        lastname    : {
            type: String,
            required: true,
            default: 'default'
        },
        userType:{
            type: String,
            required: true
        },
        LicenseNo   : {
            type: String,
            required: true,
            default: 'default'
        },
        Age : {
            type: Number,
            required: true,
            default: 18
        },
        appointmentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'AppointmentCollection',
        },
        TestType:{
            type:String,
            default:'G2'
        },
        appointmentBooked:{
            type:Boolean,
            default:false
        },
        comment:{
            type:String,
        },
        testResult:{
            type:String,
        },
        car_details :{
            make : {
                type: String,
                required: true,
                default: 'default'
            },
            model: {
                type: String,
                required: true,
                default: 'default'
            },
            year: {
                type: String,
                required: true,
                default: 'default'
            },
            plateno:{
                type: String,
                required: true,
                default: 'default'
            }
        }
    }
);

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save',function(next){
    const user=this;

    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password=hash;
        console.log(error);
        next()
    })
});

// UserSchema.pre('save',function(next){
//     const user=this;

//     bcrypt.hash(user.LicenseNo,10,(error,hash)=>{
//         user.LicenseNo=hash;
//         console.log(error);
//         next();
//     })
    
// });

const UserCollection= mongoose.model('UserCollection',UserSchema);
module.exports=UserCollection;
