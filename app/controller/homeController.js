const bcrypt=require("bcrypt");
const User = require("../models/user");
const otpgenerator=require("otp-generator");
const Otp=require("./../models/otp");
const nodemailer=require("nodemailer");
function homeContorller()
{
    return{
        home:(req,res)=>{
            res.render("home",{layout:"home"});
        },
        register:(req,res)=>{
            res.render("auth/register",{layout:"auth/register"});
        },
        login:(req,res)=>{
            res.render("auth/login",{layout:"auth/login"});
        },
        postregister:async (req,res)=>{
            const name=req.body.name;
            const email=req.body.email;
            const password=req.body.password;
            const phoneNumber=req.body.phoneNumber;
            if(!name || !email || !password || !phoneNumber)
            {
                req.flash("error","All fileds are required!!");
                res.redirect("/register");
            }
            else if(password.length<6)
            {
                req.flash("error","Password needs to be atleast 6 characters");
                res.redirect("/register");
            }
            else if(await User.findOne({email:email}))
            {
                req.flash("error","Email already exists!Try logging in");
                res.redirect("/register");
            }
            else if(phoneNumber.length<10 || phoneNumber.length>10)
            {
                req.flash("error","Invalid phonenumber");
                res.redirect("/register");
            }
            else {
                const user=new User({
                name:name,
                password:password,
                email:email,
                phoneNumber:phoneNumber
            });
            const otp= otpgenerator.generate(6,{ lowerCaseAlphabets:false,upperCaseAlphabets: false, specialChars: false });
            const newOtp=new Otp({
                otp:otp,
                userId:user._id
            });
            newOtp.save().then(async (result)=>{
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                      user: `${process.env.EMAIL_ID}`,
                      pass: `${process.env.PASSWORD}`
                    },
                  });
                  const email_message=`Hello ${user.name}!\nPlease enter the otp below to continue.\n${newOtp.otp}`;
                  const mailOptions = {
                   from: `"THIRFT WORLD"<${process.env.EMAIL_ADDRESS}>`,
                   to: `${user.email}`,
                   subject: "Email confirmation",
                   text: email_message ,
                 };
                 await transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        return res.status(400).send({"Status":"Failure","Details": err });
                    } else {
                        res.render("auth/confirmOtp",{layout:"auth/confirmOtp",registeredUser:user});
                      return res.send({"Status":"Success","Details":encoded});
                    }
                  });
            }).catch((err)=>{
                console.log("Something went wrong");
            })
        }
        },
        confirmOtp:async (req,res)=>{
            const user=JSON.parse(req.body.user);
            const enteredOtp=req.body.otp;
            const password=user.password;
            const hashedPassword=await bcrypt.hash(password,10);
            const userOtp=await Otp.findOne({userId:user._id});
            if(userOtp.otp==enteredOtp)
            {
                const newUser=new User({
                    name:user.name,
                    password:hashedPassword,
                    email:user.email,
                    phoneNumber:user.phoneNumber,
                });
                newUser.save().then((result)=>{
                    res.redirect("/login");
                }).catch(err=>{
                    console.log(err);
                })
            }
            else{
                res.redirect("/register");
            }
        },
        postlogin:async (req,res)=>{
            const {email,password}=req.body;
            if(!email || !password)
            {
                req.flash("error","All fields required");
                res.redirect("/login");
            }
            else{
            const user=await User.findOne({email:email});
            if(user==null)
            {
                req.flash("error","Email not registered!");
                res.redirect("/login");
            }
            else{
                if(await bcrypt.compare(password,user.password))
                {
                    req.session.user={user:user};
                    res.redirect("/user/home");
                }
                else{
                    req.flash("error","Wrong password!");
                    res.redirect("/login");
                }
            }
       }
    },
    }
}

module.exports=homeContorller;