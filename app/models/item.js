const mongoose=require("mongoose");
const multer=require("multer");

const itemSchema=mongoose.Schema({
    details:{
        type:String
    },
    size:{
        type:String
    },
    gender:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    img1:{
        type:String
    },
    img2:{
        type:String
    }
});

module.exports=mongoose.model("item",itemSchema);