function itemController(){
    return{
        sell:(req,res)=>{
            res.render("item/sell");
        }
    }
}

module.exports=itemController;