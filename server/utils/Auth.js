const passport = require("passport")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const {SECRET} = require("../config/index")



/***
 * @DESC To register the user (Student/ Teacher)
 */
const userRegister =  async(userDets,role,res) =>{
    try{
        //validate the email of user
        let emailNotRegistered = await validateEmail(userDets.email) 
        if(!emailNotRegistered){
            return res.status(401).json({
                message : `Email is already Registered`,
                success : false
            })
        }

        // Get the hashed password
        const password = await bcrypt.hash( userDets.password,12)
        const newUSer = new User({
            ...userDets,
            password,
            role
        })

        await newUSer.save()
        return res.status(201).json({
            message : `Hurray! Successfully Regsited. Login`,
            success:true
        })
    }catch(err){
        return res.status(403).json({
            message : `unable to create account ${err.message}`,
            success:true
        })
    }
}

/***
 * @DESC To login the user (Student/ Teacher)
 */
const userLogin = async(userCreds,role,res) =>{
    let {email, password} = userCreds;
    const user = await User.findOne({email})

    if(!user){
        return res.status(403).json({
            message: `Email not found`,
            success: false
        })
    }

    if(user.role != role){
        return res.status(401).json({
            message: `Unathorized Access`,
            success: false
        })
    }

    let isMatch = await bcrypt.compare(password,user.password)

    if(isMatch){
        let token = jwt.sign({
            user_id : user._id,
            role : user.role,
            email: user.email
        },
        SECRET,
        { expiresIn: "7 days" }
        )

        let result = {
            user : serializeUser(user),
            role: user.role,
            token:`Bearer ${token}`,
            expiresIn: 168
        }
        return res.status(200).json({
            ...result,
            message: `You're Logged in `,
            success: true
        })   
    }
    else{
        return res.status(403).json({
            message: `Incorrect Password`,
            success: false
        })
    }
}

const validateEmail = async email => {
    let user = await User.findOne({email});
    return user ? false :true;

}

/***
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req,res,next) =>{
    if( roles.includes(req.user.role) ){
        return next()
    }
    return res.status(401).json({
        message: "Unathorized",
        success :false
    })
}

/***
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate('jwt', { session:false});


const serializeUser = user => {
    return {
        email: user.email,
        name: user.name,
        _id: user._id,
        role: user.role,
        createdAt: user.createdAt
    }
}
module.exports ={
    userRegister,
    userLogin,
    checkRole,
    userAuth,
    serializeUser
}