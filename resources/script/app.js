const shop=document.getElementById("shop");
const shopDiv=document.getElementById("shopDiv");
const searchDiv=document.getElementById("searchDiv");
const search=document.getElementById("search");
shop.addEventListener("click",()=>{
     searchDiv.style.display="none"
     if(shopDiv.style.display=="block")
     {
        shopDiv.style.display="none";
     }
     else{
        shopDiv.style.display="block";
     }
})

const profile=document.getElementById("profile");
const sidenav=document.getElementById("sidenav");

profile.addEventListener("click",()=>{
    if(sidenav.style.display=="block")
    {
        sidenav.style.display="none";
    }
    else{
        sidenav.style.display="block";
    }
})

const itemImgs=document.getElementById("item-imgs");
if(itemImgs){
    itemImgs.addEventListener("input",()=>{
        document.getElementById("itemimg1").src=window.URL.createObjectURL(event.target.files[0]);
        document.getElementById("itemimg2").src=window.URL.createObjectURL(event.target.files[1]);
    })
}
const postImgs=document.getElementById("postImgs");
if(postImgs){
    postImgs.addEventListener("click",()=>{
        itemImgs.click();
    })
}

