const homeContorller=require("./../app/controller/homeController");
const uController=require("./../app/controller/uController");
const itemController=require("./../app/controller/itemController");
function allRoutes(app){
    app.get("/",homeContorller().home);
    app.get("/register",homeContorller().register);
    app.post("/register",homeContorller().postregister);
    app.post("/confirmOtp",homeContorller().confirmOtp);
    app.get("/login",homeContorller().login);
    app.post("/login",homeContorller().postlogin)
    app.get("/user/home",uController().home);
    app.get("/sell",itemController().sell);
}

module.exports=allRoutes;

