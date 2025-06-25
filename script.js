
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
   firebase.database().ref("messages/" + Date.now()).set({
  text: message,
  time: Date.now()
});
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
  const key = snapshot.key;

  let item = document.createElement("div");
  item.innerText = messageData.text;
  container.appendChild(item);
  container.scrollTop = container.scrollHeight;

  const currentTime = Date.now();
  const messageTime = messageData.time || currentTime;
  const timePassed = currentTime - messageTime;
  const timeLeft = 300000 - timePassed;

  if (timeLeft <= 0) {
    // Agar message pehle ka hai, turant hata do
    container.removeChild(item);
    firebase.database().ref("messages/" + key).remove();
  } else {
    // Baaki time ke baad delete karo
    setTimeout(() => {
      if (item && item.parentNode === container) {
        container.removeChild(item);
      }
      firebase.database().ref("messages/" + key).remove()
        .catch(err => console.error("Firebase delete failed:", err));
    }, timeLeft);
  }
});
// Delete old messages after 5 minutes (on page load)
let oldMessages = document.querySelectorAll(".message");
oldMessages.forEach(msg => {
  setTimeout(() => msg.remove(), 5 * 60 * 1000);
});



