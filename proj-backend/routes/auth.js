const express=require('express')
const router=express.Router()
const {check,validationResult}=require("express-validator")
const {signout,signup,signin,isSignedIn} =require("../controllers/auth")



router.post('/signup',[
    check("name","name should be atleast 3 character").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be atleast 6 character").isLength({min:6}), 
],signup)

router.post('/signin',[
    
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:6}), 
],signin)





router.get('/signout',signout)


module.exports=router