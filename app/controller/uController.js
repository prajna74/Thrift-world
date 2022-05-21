function uController(){
    return {
         home:(req,res)=>{
             res.render("user/home");
         }
    }
}
module.exports=uController;