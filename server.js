require("dotenv").config();
const express=require("express");
const app=express();
const ejs=require("ejs");
const expressLayout=require("express-ejs-layouts");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/thriftworld")
app.set("view engine","ejs");
app.set("views","./resources/views")
app.set("layout","layouts/layout.ejs");
app.use(expressLayout);
app.use(express.static(__dirname + '/public'));
const allRoutes=require("./routes/web");

allRoutes(app);

app.listen(process.env.PORT||8080,(req,res)=>{
    console.log("Listening on port 8080");
})