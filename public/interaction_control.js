const clr_picker = document.querySelector('.color-picker');
const thickness_selector = document.querySelector('.brush-thickness-picker');
const bgr_color = document.querySelector('.set-background');
const clr_pallete = document.querySelector('.colors');
const thickness_pallete = document.querySelector('.thickness-variations');
const chatBox_icon = document.querySelector('.chatBox_icon');
const chatBox_container = document.querySelector('.chatBox-container');
const clear_board = document.querySelector('.set-background');
const canvas_board = document.querySelector('.whiteboard');
const eraser = document.querySelector('.eraser');
var canvas = document.getElementsByClassName('whiteboard')[0];
var context = canvas.getContext('2d');
const msg_notif = document.querySelector('.red_circle');

var clr = 0;

function displayColorPicker(){
    if(clr_pallete.style.visibility === "visible")   
        clr_pallete.style.visibility = "hidden";
    else 
        clr_pallete.style.visibility = "visible";    
}
function ColorPicker_visible(){   
    clr_pallete.style.visibility = "visible";
}
function ColorPicker_hidden(){   
    clr_pallete.style.visibility = "hidden";
}

function display_Thickness_Selector(){
    if(thickness_pallete.style.visibility === "visible")
        thickness_pallete.style.visibility = "hidden";
    else
        thickness_pallete.style.visibility = "visible";    
}
function thickness_pallete_visible(){
    thickness_pallete.style.visibility = "visible";    
}
function thickness_pallete_hidden(){
    thickness_pallete.style.visibility = "hidden";    
}

function chatBox_container_hidden(){
    chatBox_container.style.visibility = "hidden";
}
function chatBox_container_visible(){
    chatBox_container.style.visibility = "visible";
}
function chatBox_container_selector(){
    if(chatBox_container.style.visibility === 'visible')
        chatBox_container.style.visibility = "hidden";
    else
        chatBox_container.style.visibility = "visible"; 
    msg_notif.style.visibility = "hidden";   
}


clr_picker.addEventListener('click',displayColorPicker);
clr_pallete.addEventListener('mouseout',ColorPicker_hidden);
clr_pallete.addEventListener('mouseover',ColorPicker_visible);
thickness_selector.addEventListener('click',display_Thickness_Selector);
thickness_pallete.addEventListener('mouseover',thickness_pallete_visible);
thickness_pallete.addEventListener('mouseout',thickness_pallete_hidden);
chatBox_icon.addEventListener('click',chatBox_container_selector);
chatBox_container.addEventListener('mouseover',chatBox_container_visible);
chatBox_container.addEventListener('mouseout',chatBox_container_hidden);
clear_board.addEventListener('click',() => {
    context.fillStyle = "#263238";
    context.fillRect(0, 0, canvas.width, canvas.height);
});

          
        

          