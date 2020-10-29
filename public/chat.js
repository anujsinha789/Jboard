const socket = io();
// console.log(window.location.hostname);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msg-input');
const messageContainer = document.querySelector('.message-screen');
const msg_notifier = document.querySelector('.red_circle');


var names = {};

var audio = document.getElementById('audio');

window.onload = function () {
    let name = "";
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    name = data.name;
    if(name === '')
    do{
        name = prompt('Please Enter Your name!!');
    }while(name === '');
    socket.emit('new-user-joined',name);
    console.log(name);
}

const append = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left'){
        audio.play();
    }
    
}

const addUser = (name) => {
    const userElement = document.createElement('div');
    userElement.innerText = `${name} is active.`;
    userElement.classList.add('active-users');
    userElement.classList.add('member-container');
    //userList.append(userElement);
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message != ''){
        append(`You: ${message}`,'right');
        socket.emit('send',message);
        messageInput.value = '';
    }   
    
})



// socket.emit('new-user-joined',name);

socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'right');
    addUser(name);
    msg_notifier.style.visibility = "visible";
})
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left');
    msg_notifier.style.visibility = "visible";
    // console.log(msg_notif);
})

socket.on('left', data =>{
    if(data !== null){
        msg_notifier.style.visibility = 'visible';
        append(`${data}: left the chat`,'left');
    }
})
