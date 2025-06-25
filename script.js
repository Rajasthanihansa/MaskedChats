
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
    // container.appendChild(item);
    // container.scrollTop = container.scrollHeight;// apne aap scroll hoga

    inp.value="";//message sent hone ke baad input me text na rhe isliye

    //  setTimeout(() => {
    //     item.remove();
    // }, 5000000);
})

firebase.database().ref("messages/").on("child_added", function(snapshot) {
  const messageData = snapshot.val();
  const key = snapshot.key;  // Ye add karo, firebase message ka unique key

  let item = document.createElement("div");
  item.innerText = messageData.text;
  container.appendChild(item);
  container.scrollTop = container.scrollHeight;

  // 5 minute baad message DOM se hata do aur Firebase se bhi delete karo
  setTimeout(() => {
    container.removeChild(item);                  // Message page se hatao
    firebase.database().ref("messages/" + key)   // Firebase se bhi delete karo
      .remove()
      .catch(err => console.error("Firebase delete failed:", err));
  }, 300000); 
});



