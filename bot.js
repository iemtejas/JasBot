window.onload = function () {
    adjustUI();
    sendInitialGreeting();
    scheduleHumorousMessages();
    document.getElementById("msg").addEventListener("keyup", function (e) {
        if (e.keyCode === 13 && this.value.trim() !== "") {
            send();
        }
    });
};

window.onresize = adjustUI;

function adjustUI() {
    document.getElementById("messages").style.height = window.innerHeight - document.getElementById("inputSystem").offsetHeight - 30 + "px";
}

function send() {
    var inputMsg = document.getElementById("msg").value.trim();
    if (inputMsg === '') return;
    sendMsg(inputMsg, true);
    reply(inputMsg.toLowerCase());
    document.getElementById("msg").value = "";
}

function sendMsg(message, right) {
    var msgCon = document.createElement("div");
    msgCon.setAttribute("class", right ? "right" : "left");
    msgCon.innerHTML = message;
    document.getElementById("messages").appendChild(msgCon);
    msgCon.scrollIntoView({ behavior: "smooth" });
}

function sendInitialGreeting() {
    setTimeout(() => {
        sendMsg("Hey there! I'm JasBot, your professional assistant. How can I assist you today?", false);
    }, 2000);
}

function scheduleHumorousMessages() {
    let delays = [5000, 600000, 1200000]; // Delays in milliseconds
    let messages = [
        "Do you enjoy music? Of course, you do! Check out some tunes 🎶.",
        "Still here? Let's keep the vibe going with some music 🎧.",
        "Hey, thought I'd share some music with you. Enjoy! 😄"
    ];

    let links = [
        '<a href="https://youtube.com/@user-dn8td2cq1j?si=Pd8jcijmUCOt_iGi" target="_blank">Watch this on YouTube! 🎥</a>',
        '<a href="https://www.instagram.com/imatejas/" target="_blank">Follow me on Instagram! 📸</a>'
    ];

    delays.forEach((delay, index) => {
        setTimeout(() => {
            sendMsg(`${messages[index]} ${links[index % links.length]}`, false);
        }, delay);
    });
}

function reply(msg) {
    let response = "";

    if (msg.includes("who created you") || msg.includes("who made you") || msg.includes("who developed you")) {
        response = "I was created by Tejas Sharma.";
    } else if (msg.includes("tell me a joke")) {
        response = getJoke();
    } else if (msg.includes("write a love letter")) {
        response = writeLoveLetter();
    } else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
        response = "Hello! How can I assist you today?";
    } else if (msg.includes("what is your name")) {
        response = "I'm JasBot, your friendly assistant!";
    } else if (msg.includes("are you a man or a woman")) {
        response = "I'm just a bot with no gender.";
    } else if (msg.includes("do you love me")) {
        response = "I appreciate all humans, but as a bot, I don't have feelings.";
    } else if (msg.includes("how old are you")) {
        response = "Age is just a number! I'm as old as the code that created me.";
    } else {
        response = "I'm not sure about that.";
        setTimeout(() => searchOnline(msg), 1000);
    }

    sendMsg(response, false);
}

function getJoke() {
    const jokes = [
        "Why don't skeletons fight each other? They don't have the guts.",
        "I'm reading a book on anti-gravity. It's impossible to put down!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

function writeLoveLetter() {
    return "My dearest, \n\nFrom the moment I met you, I knew my life would never be the same. You bring joy and light to my every day, and I can't imagine a world without you in it.\n\nYours forever.";
}

function searchOnline(query) {
    sendMsg("Let me search that up for you...", false);
    var frame = document.createElement("iframe");
    frame.src = "https://www.bing.com/search?q=" + encodeURIComponent(query);
    frame.style.width = "100%";
    frame.style.height = "300px";
    frame.style.border = "none";
    document.getElementById("messages").appendChild(frame);
    frame.scrollIntoView({ behavior: "smooth" });
}
