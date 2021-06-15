const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {check,validationResult}=require("express-validator")
const Users = require("../models/user")

const loadSingup =(req,res)=>{
    const errors = []
    title="Create new account"

res.render("register",{title,errors,inputs:{},login:false,userName:false})
}
const loadLogin = (req,res)=>{
    title="User Login"
    res.render("login",{title,errors:[],inputs:req.body,login:false,userName:false})
}

const postLogin = async (req,res)=>{
const {email,password} = req.body;
const errors = validationResult(req);
if(!errors.isEmpty()){
res.render("login",{title:"User Login",errors:errors.array(),inputs:req.body,login:false,userName:false})
}
else{
    const checkEmail = await Users.findOne({email})
    if(checkEmail!==null){
        const id = checkEmail._id;
        const _name=checkEmail.name;
        const dbPassword = checkEmail.password
        const passwordVerify = await bcrypt.compare(password,dbPassword)
        if(passwordVerify){
            // Create Token..
            const token = jwt.sign({userID:id},process.env.JWT_SECRET,{
                expiresIn:"20d"
            })
            // Create Session variable..
            req.session.user= token;
            req.session.user_name= _name;
            
            res.redirect("/profile")

        }
        else{
            res.render("login",{title:"User Login",errors:[{msg:' Wrong Password'}],inputs:req.body,
            login:false,userName:false})
        }
    }
    else{
        res.render("login",{title:"User Login",errors:[{msg:'Email not found'}],inputs:req.body,
        login:false,userName:false})
    }
}
}

const loginValidations = [

    
    check('email').not().isEmpty().withMessage("valied email is required"),
    check('password').not().isEmpty().withMessage('password is required')


]


const registerValidations = [

    // Form Validation...
    check('name').isLength({min:3}).withMessage('Name is required & must be of  min 3 characters'),
    check('email').isEmail().withMessage("valied email is required.."),
    check('password').isLength({min:6}).withMessage('password must be of 6 characters')


]

const postRegister = async (req,res)=>{
    const {name,email,password}=req.body;
     const errors = validationResult(req)
     if(!errors.isEmpty()){
         
         title="Create new account"
         res.render("register",{title,errors:errors.array(),inputs:req.body,login:false,userName:false})
     }
     else{
         try{
             const userEmail=await  Users.findOne({email})
             if(userEmail === null){
                 const salt = await  bcrypt.genSalt(10)
                 const hashed = await bcrypt.hash(password,salt)
                 
                 const newUser = new Users({
                     name:name,
                     email:email,
                     password:hashed
 
                 })
                 try{
                     const createdUser = await newUser.save();
                    req.flash('success',"Your account has been created successfully")
                     res.redirect('/login')
                 }
                 catch(err){
                     console.log(err.message)
                 }
               
             }
             else{
                 res.render("register",{title:'Create new account',errors:[{msg:'Email  already exists'}],
                 inputs:req.body,login:false,userName:false})
             }
         }
       catch(err){
         console.log(err.message)
       }
        
     }
    }

module.exports = {
    loadSingup,
    loadLogin,
    registerValidations,
    postRegister,
    postLogin,
    loginValidations
}