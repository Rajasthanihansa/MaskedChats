let btn = document.querySelector("button");
let inp = document.querySelector("input");
let container = document.querySelector(".message-container");

btn.addEventListener("click", function () {
  let message = inp.value.trim();
  if (message === "") return;

  try {
    firebase.database().ref("messages/" + Date.now()).set({
      text: message,
      time: Date.now()
    });
  } catch (e) {
    console.error("Firebase write failed:", e);
  }
  inp.value = "";
});

// Page load par purane messages check karo aur delete schedule karo ya turant delete karo
firebase.database().ref("messages/").once("value").then(snapshot => {
  snapshot.forEach(childSnapshot => {
    const messageData = childSnapshot.val();
    const key = childSnapshot.key;

    const currentTime = Date.now();
    const messageTime = messageData.time || currentTime;
    const timePassed = currentTime - messageTime;
    const timeLeft = 300000 - timePassed; // 5 minutes in ms

    if (timeLeft <= 0) {
      firebase.database().ref("messages/" + key).remove()
        .catch(err => console.error("Firebase delete failed:", err));
    } else {
      setTimeout(() => {
        firebase.database().ref("messages/" + key).remove()
          .catch(err => console.error("Firebase delete failed:", err));
      }, timeLeft);
    }
  });
});

// Realtime listener: messages show karo aur unka delete timer lagao
firebase.database().ref("messages/").on("child_added", snapshot => {
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
    if (item.parentNode === container) {
      container.removeChild(item);
    }
    firebase.database().ref("messages/" + key).remove()
      .catch(err => console.error("Firebase delete failed:", err));
  } else {
    setTimeout(() => {
      if (item.parentNode === container) {
        container.removeChild(item);
      }
      firebase.database().ref("messages/" + key).remove()
        .catch(err => console.error("Firebase delete failed:", err));
    }, timeLeft);
  }
});
