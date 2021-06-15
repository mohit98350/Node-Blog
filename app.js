const express = require("express");

const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require("express-flash")
require('dotenv').config();
const connect = require("./models/db")
const profileRoutes = require("./Routes/profileRoutes")
const userRoutes = require("./Routes/userRoutes")
const postRoutes = require("./Routes/postRoutes")
const app = express();
const PORT = process.env.PORT || 5000
//DB connection.
connect();
//Express Session  middleware
const store = new MongoDBStore({
    uri:process.env.DB,
    collecton:'sessions'
})

app.use(session({
    secret: 'process.env.SESSION_KEY',
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge:1000*12*24*60*60
    },
    store:store
    
  }))
  // flash middleware
app.use(flash())
app.use((req,res,next)=>{
    res.locals.message=req.flash()
    next();
})


//Load static files..//
app.use(express.static("./views"))
app.use(express.urlencoded({extended: true}))
// set ejs
app.set("view engine","ejs");

//ROUTES

app.use(userRoutes)
app.use(profileRoutes)
app.use(postRoutes)

//create server
app.listen(PORT,()=>{
    console.log(`server running on port no:${PORT}`)
})