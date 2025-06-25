
let btn = document.querySelector("button");
let inp= document.querySelector("input");
let container=document.querySelector(".message-container");//seclect karenge taki isme message ko apend kar sake
btn.addEventListener("click", function(){

    console.log("btn clicked");
    let message=inp.value;
   
    if (message === "") return;  // ✅ agar khali hai to return (kuch bhi mat karo)
    
    let item=document.createElement("div");//new div item create kiya
    item.innerText=message;//inp value new div me dali
   // firebase.database().ref("messages/" + Date.now()).set({ text: message });
   try {
    firebase.database().ref("messages/" + Date.now()).set({ text: message });
  } catch (e) {
    console.error("Firebase write failed:", e);
  }
    container.appendChild(item);
    container.scrollTop = container.scrollHeight;// apne aap scroll hoga

    inp.value="";//message sent hone ke baad input me text na rhe isliye

     setTimeout(() => {
        item.remove();
    }, 5000000);
})

