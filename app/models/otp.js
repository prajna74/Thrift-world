const mongoose=require("mongoose");
const otpSchema=mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    expireTime:{
        type: Date,
        default: Date.now(),
        expires: 60
    }
});

otpSchema.index({expireTime:1},{expireAfterSeconds:5000});

module.exports=mongoose.model("otp",otpSchema);