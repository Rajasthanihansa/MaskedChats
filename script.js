
let btn = document.querySelector("button");
let inp= document.querySelector("input");
let container=document.querySelector(".message-container");//seclect karenge taki isme message ko apend kar sake
btn.addEventListener("click", function(){

    console.log("btn clicked");
    let message=inp.value;
    console.log(message);
    let item=document.createElement("div");//new div item create kiya
    item.innerText=inp.value;//inp value new div me dali
    container.appendChild(item);
    container.scrollTop = container.scrollHeight;// apne aap scroll hoga

    inp.value="";//message sent hone ke baad input me text na rhe isliye

     setTimeout(() => {
        item.remove();
    }, 5000000);
})

