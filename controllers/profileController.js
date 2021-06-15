const session = require("express-session");
const Users = require("../models/user")


const  profile = async (req,res)=>{
const id = req.id;
var user = await Users.findOne({_id:id})
const name=req.session.user_name;
res.render('profile',{title:'Profile',login:true,user,name})
}




const logout = (req,res)=>{
req.session.destroy((err)=>{
    if(!err){
        res.redirect('/login')
    }
});

}

module.exports = {
    profile,
    logout
}