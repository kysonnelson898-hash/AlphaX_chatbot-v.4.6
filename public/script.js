const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");


function addMessage(text, type) {

const message = document.createElement("div");

message.className = type;

message.innerText = text;

messages.appendChild(message);

messages.scrollTop = messages.scrollHeight;

}


function showTyping() {

const typing = document.createElement("div");

typing.className = "bot";

typing.id = "typing";

typing.innerText = "AlphaX is thinking...";

messages.appendChild(typing);

messages.scrollTop = messages.scrollHeight;

}



function removeTyping(){

const typing = document.getElementById("typing");

if(typing){

typing.remove();

}

}



async function sendMessage(){

const text = input.value.trim();


if(!text) return;


addMessage(text,"user");


input.value="";


showTyping();



try {


const response = await fetch("/api/chat", {

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

message:text

})

});



const data = await response.json();



removeTyping();



addMessage(

data.reply || "I didn't receive a response.",

"bot"

);


}

catch(error){


removeTyping();


addMessage(

"Sorry, I am having trouble connecting right now.",

"bot"

);


console.error(error);


}


}



sendButton.addEventListener(

"click",

sendMessage

);



input.addEventListener(

"keydown",

function(event){


if(event.key === "Enter" && !event.shiftKey){

event.preventDefault();

sendMessage();

}


}

);
