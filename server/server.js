const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');
const bp = require("body-parser")
const passport = require("passport");
const { success, error} = require('consola')
const DB =require("./config/index").DB;
const bodyParser = require("body-parser");
const PORT = 5000


const app = express();

// MiddleWares
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended:false}))
app.use(passport.initialize());

require("./middlewares/passport")(passport)

// //Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/user'))
app.use('/teacher', require('./routes/Teacher'))
app.use('/student', require('./routes/Student'))

const startApp= async() =>{
    // Connect to Mongo Db 
    try{
        await mongoose.connect(DB,{
            useNewUrlParser : true})
            success({
                message : "MongoDB connected!",
                badge : true
            })
        app.listen(5000, () => success({ message: `Server statrted on port ${PORT}`, badge: true}))
    }
    catch (err){
        error({
            message: 'Unable to connect!',
            badge :true
        })
    startApp();
    }
}

startApp()