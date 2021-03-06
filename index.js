const express = require("express");
const passport = require("passport");
const path = require('path');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const cors = require('cors')
const session = require('express-session');
const dotenv = require("dotenv");
const auth = require("./auth");
const app = express();
const cloudinary = require('cloudinary').v2;


auth.useStrategies();

const indexRoutes = require('./routes/index.routes');
const authRoutes = require("./routes/auth.routes");
const scheduleRoutes = require("./routes/schedule.routes");
const todoRoutes = require("./routes/todo.routes");
const meetingRoutes = require("./routes/meeting.routes");
const userRoutes = require("./routes/user.routes");

const db = require('./config/db.config');
db.connect();

const PORT = process.env.PORT || 4000

let corsOptions = {
    origin:`http://localhost:${PORT}`
}

dotenv.config();

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    req.isAuth = req.isAuthenticated();
    next();
 });

 cloudinary.config({ 
    cloud_name: 'gonzadelarge', 
    api_key: '832982537229167', 
    api_secret: 'uZwHbCAyDpl6VQe9kaAp_lXMtU4' 
  });

 app.use(methodOverride('_method'));

app.use("/", indexRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use("/meetings", meetingRoutes);
app.use("/users", userRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    return res.json(error.message);
});

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error')
});

app.listen(PORT, () => console.log(`Servidor a tota virolla en http://localhost:${PORT}`))