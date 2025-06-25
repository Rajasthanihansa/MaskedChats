
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

// Page load par purane messages check karo aur delete schedule karo ya turant delete karo
firebase.database().ref("messages/").once("value").then(snapshot => {
  snapshot.forEach(childSnapshot => {
    const messageData = childSnapshot.val();
    const key = childSnapshot.key;

    const currentTime = Date.now();
    const messageTime = messageData.time || currentTime;
    const timePassed = currentTime - messageTime;
    const timeLeft = 300000 - timePassed;  // 5 minutes = 300000 ms

    if (timeLeft <= 0) {
      // Agar message expire ho chuka hai to turant delete karo
      firebase.database().ref("messages/" + key).remove()
        .catch(err => console.error("Firebase delete failed:", err));
    } else {
      // Agar abhi expire nahi hua hai to baaki time ke baad delete schedule karo
      setTimeout(() => {
        firebase.database().ref("messages/" + key).remove()
          .catch(err => console.error("Firebase delete failed:", err));
      }, timeLeft);
    }
  });
});


