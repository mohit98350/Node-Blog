const express = require("express");
const router =express.Router();

//User Controller

const {loadSingup,loadLogin,registerValidations,postRegister, postLogin,
loginValidations} = require("../controllers/userController")

const{stopLogin} = require("../middlewares/auth")

router.get("/",stopLogin, loadSingup)
router.get('/login',stopLogin,loadLogin)
router.post('/register',registerValidations,postRegister)
router.post('/postLogin',loginValidations,postLogin)


module.exports = router;