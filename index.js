const express= require('express');
const path= require("path");//gets us the specific path of a file
const ejs= new require('ejs');
const app= new express();//start new epxress
const session= require('express-session');
const bodyParser= require('body-parser');
const flash= require('req-flash');

const mongoose= require('mongoose');
const uri = require('dotenv').config();
mongoose.connect(uri, {useNewUrlParser:true})

const gController=require('./controllers/g')
const g2Controller= require('./controllers/g2')
const g2UpdateUser =require('./controllers/g2UpdateUser')
const getInfo= require('./controllers/getInfo')
const updateInfo= require('./controllers/updateInfo');
const appointmentController= require('./controllers/appointment');

//auth and Signup
const signupController =require('./controllers/signup');
const LoginController= require('./controllers/login');
const addUserController=require('./controllers/addUser');
const userLoginController= require('./controllers/userLogin')
const logoutController= require('./controllers/logout');

//Appointments controller

const createAppointmentController= require('./controllers/createAppointment');
const AvailAppointmentsController= require('./controllers/availAppointment');
const bookAppoinmentController= require('./controllers/bookAppoinment');
const bookGAppoinmentController= require('./controllers/bookGAppoinment');
const getAppointmentController= require('./controllers/getAppointment');
const updateAppointmentController= require('./controllers/updateAppointment');
const bookedTestController= require('./controllers/bookedTest');

const UpdateTestController= require('./controllers/updateTest');

//middleware

const authValid= require('./middleware/authValidator');
const adminAuth= require('./middleware/adminAuthentication');
const defaultCheck= require('./middleware/defaultCheck');


const { update } = require('./models/User');
const examinerAuthentication = require('./middleware/examinerAuthentication');

app.use(express.static('public'));
app.use(express.json());

app.use(session({
    secret:"session key",
    resave:false,
    saveUninitialized:true
}));
app.use(flash());
app.use(express.urlencoded({extended:true}));
app.use('*',function(req, res, next) {
    console.log(req.session.user);
    res.locals.user = req.session.user;
    res.locals.users=req.session.users;
    res.locals.appointments=req.session.appointments;
    // res.locals.userType =req.session.user.userType;
    next();
});
app.use(bodyParser.urlencoded({extended:true}));


app.set('view engine','ejs');// this will recognize ejs extension


app.listen(4000,()=>{
    console.log("App is listening at 4000");
    
})

app.get('/',(req,res)=>{
    res.render('index');
})

// app.get('/g2_test',[authValid,defaultCheck],g2Controller);
app.get('/g2_test',[authValid,defaultCheck],bookAppoinmentController);

app.get('/getAppointments',AvailAppointmentsController);

app.get('/events/:id',getAppointmentController);

app.post('/test/update',UpdateTestController);

// app.post('/getInfo',getInfo);

app.post('/update/user',g2UpdateUser);

app.post('/update/appointment',updateAppointmentController);

// app.post('/updateInfo',updateInfo);

app.get('/signup',signupController);

app.get('/g_test',[authValid,defaultCheck],bookGAppoinmentController);
// app.get('/g_test',[authValid,defaultCheck],bookedTestController);

app.get('/roadTest',examinerAuthentication,bookedTestController);


app.get('/appointment',adminAuth,appointmentController);

app.post('/create/appointment',createAppointmentController);

app.get('/login',LoginController);

app.post('/user/login',userLoginController)

app.post('/user/signup',addUserController)

app.get('/logout',logoutController)