const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
       
    },
    phoneNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"customer"
    }
});

module.exports=mongoose.model("user",userSchema);