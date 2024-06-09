const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
const Schema= mongoose.Schema;

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
        usertype:{
            type: String,
            required: true
        },
        licenseNo   : {
            type: String,
            required: true,
            default: 'default'
        },
        age : {
            type: Number,
            required: true,
            default: 0
        },
        dob : {
            type: Date,
            required: true,
            default: 0
        },
        appointmentID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
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
UserSchema.pre('save',function(next){
    const user=this;

    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password=hash;
        console.log(error);
        next()
    })    
});

const UserCollection= mongoose.model('User',UserSchema);
module.exports=UserCollection;