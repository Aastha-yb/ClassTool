const express = require("express")
const router = express.Router()
const {
    userRegister,
    userLogin, 
    checkRole,
    userAuth, 
    serializeUser
} = require("../Utils/Auth")

//Login Page
router.get( '/login', (req,res) => {
    res.send("Welcome to Login PAGE")
})

//Register Page
router.get( '/register', (req,res) => {
    res.send("Welcome to Register PAGE")
})

//Student Registeration Route
router.post('/register-student',async(req,res)=>{
    await userRegister( req.body, "Student", res)
})

//Teacher Registeration Route 
router.post('/register-teacher',async(req,res)=>{
    await userRegister( req.body, "Teacher", res)
})

//Student Login Route
router.post('/login-student',async(req,res)=>{
    await userLogin(req.body,"Student",res)
})

//Teacher Login Route
router.post('/login-teacher',async(req,res)=>{
    await userLogin(req.body,'Teacher',res)
})

// Profile Route
router.get('/profile',userAuth, async(req,res) => {
    return res.json(serializeUser(req.user));
})

//Student Protected Route
router.get('/student-profile',userAuth, checkRole(['Student']) , async(req,res)=>{
    return res.json({
        "user" : serializeUser(req.user),
        "message" : "Hello Student"})
})

//Teacher Proctected Route
router.get('/teacher-profile',userAuth, checkRole(['Teacher']) , async(req,res)=>{
    return res.json({
        "user" : serializeUser(req.user),
        "message" : "Hello Teacher"})
})



module.exports = router