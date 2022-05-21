require("dotenv").config();
const express=require("express");
const app=express();
const ejs=require("ejs");
const expressLayout=require("express-ejs-layouts");
const mongoose=require("mongoose");
const session=require("express-session");
const mongoStore=require("connect-mongo");
const bcrypt=require("bcrypt");
const flash=require("express-flash");
mongoose.connect(process.env.DATABASE_URL);
app.set("view engine","ejs");
app.set("views","./resources/views")
app.set("layout","layouts/layout.ejs");
app.use(expressLayout);
app.use(express.static(__dirname + '/public'));
const allRoutes=require("./routes/web");
app.set("layout home",false);
app.set("layout auth/register",false);
app.set("layout auth/login",false);
app.set("layout auth/confirmOtp",false);

app.use(session({
    resave:false,
    secret:process.env.SECRET_KEY,
    saveUninitialized:false,
    store:mongoStore.create({
        mongoUrl:process.env.DATABASE_URL,
        ttl:24*60*60*1000
    }),
    cookie:{maxAge:24*60*60*1000}
}));



app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use((req,res,next)=>{
    res.locals.session=req.session;
    res.locals.user=req.session.user;
    next();
})


app.use(flash());

allRoutes(app);
app.listen(process.env.PORT||8080,(req,res)=>{
    console.log("Listening on port 8080");
})