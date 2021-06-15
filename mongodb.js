const mongoose = require("mongoose");

//connect mongodb
const connection = async() =>{
    try{
      await mongoose.connect("mongodb://127.0.0.1/Database",{useNewUrlParser:true,
    useUnifiedTopology:true})
    console.log("Mongodb connected...")
    }
    catch(err){
        console.log(err.message)
    }
    
}
connection();
//schema..

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }

},{timestamps:true})
// create Model..

const Users = mongoose.model("user",userSchema);

Users.find().then(users=>{
    console.log(users)
}).catch(error=>{
    console.log(error.message)
})