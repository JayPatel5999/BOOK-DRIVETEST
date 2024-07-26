const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('req-flash');
const MongoStore = require('connect-mongo');
require('dotenv').config();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Set Mongoose strictQuery option
mongoose.set('strictQuery', false);

// Connect to MongoDB using environment variable
const mongoURI = process.env.MONGODB_URI; // Make sure this environment variable is set
if (!mongoURI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Middlewares
app.use(express.static('public'));
app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: mongoURI }) // Use MongoStore
}));
app.use(flash());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Global middleware to set user in locals
app.use('*', function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

// Controller Files
const GController = require('./controllers/g');
const G2Controller = require('./controllers/g2');
const G2UpdateUserController = require('./controllers/G2UpdateUser');
const GetDataController = require('./controllers/getData');
const UpdateDataController = require('./controllers/updateData');
const SignUpController = require('./controllers/SignUp');
const NewSignUpController = require('./controllers/NewSignUp.js');
const LoginController = require('./controllers/login');
const UserLoginController = require('./controllers/UserLogin');
const LogoutController = require('./controllers/logout');
const AppointmentController = require('./controllers/Appointment.js');
const CreateAppointmentController = require('./controllers/CreateAppointment.js');
const AvailAppointmentController = require('./controllers/AvailAppointment');
const BookAppoinmentController = require('./controllers/BookAppointment');
const GetAppointmentController = require('./controllers/GetAppointment');
const UpdateAppointmentController = require('./controllers/UpdateAppointment');

// Middlewares for routes
const authMiddleware = require('./middleware/authMiddleware');
const defaultCheckerMiddleware = require('./middleware/defaultchecker');
const AdminAuthMiddleware = require('./middleware/AdminAuthMiddleware');
const ExaminerAuthMiddleware = require('./middleware/ExaminerAuthMiddleware');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/g2_test', [authMiddleware, defaultCheckerMiddleware], BookAppoinmentController);
app.get('/GetAppointment', AvailAppointmentController);
app.get('/events/:id', GetAppointmentController);
app.get('/g_test', [authMiddleware, defaultCheckerMiddleware], GController);
app.get('/login', LoginController);
app.post('/user/login', UserLoginController);
app.get('/logout', LogoutController);
app.get('/signup', SignUpController);
app.post("/update/user", G2UpdateUserController);
app.post('/update/Appointment', UpdateAppointmentController);
app.post("/GetData", GetDataController);
app.post("/UpdateData", UpdateDataController);
app.post("/user/signup", NewSignUpController);
app.get("/appointment", AdminAuthMiddleware, AppointmentController);
app.post("/create/appointment", CreateAppointmentController);

// Start server
app.listen(4000, () => {
  console.log('App listening on port 4000');
});
