
function allRoutes(app){
    app.get("/",(req,res)=>{
        res.render("home");
    })
}

module.exports=allRoutes;