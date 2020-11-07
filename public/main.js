'use strict';

(function() {

  var socket = io();
  var canvas = document.getElementsByClassName('whiteboard')[0];
  var colors = document.getElementsByClassName('color');
  var context = canvas.getContext('2d');
  const one_px_line = document.querySelector('.one_px');
  const two_px_line = document.querySelector('.two_px');
  const four_px_line = document.querySelector('.four_px');
  const ten_px_line = document.querySelector('.ten_px'); 
  const twenty_px_line = document.querySelector('.twenty_px');
  const eraser = document.querySelector('.eraser'); 

  var current = {
    color: 'black'
  };
  var drawing = false;

  one_px_line.addEventListener('click',setLineWidth_1);
  two_px_line.addEventListener('click',setLineWidth_2);
  four_px_line.addEventListener('click',setLineWidth_4);
  ten_px_line.addEventListener('click',setLineWidth_10);
  twenty_px_line.addEventListener('click',setLineWidth_20);

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
  
  //Touch support for mobile devices
  canvas.addEventListener('touchstart', onMouseDown, false);
  canvas.addEventListener('touchend', onMouseUp, false);
  canvas.addEventListener('touchcancel', onMouseUp, false);
  canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  socket.on('room-created',(room) =>{
    socket.emit('room-id',room);
  });
  socket.on('drawing', (data) => {
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color,data.width);
  });

  window.addEventListener('resize', onResize, false);
  onResize();
  let LWidth = 2;
  function setLineWidth_1(){
    context.lineWidth = 1;
    LWidth = 1;
    console.log("1");
  }
  function setLineWidth_2(){
    context.lineWidth = 2;
    LWidth = 2;
    console.log("2");
  }
  function setLineWidth_4(){
    context.lineWidth = 4;
    LWidth = 4;
    console.log("4");
  }
  function setLineWidth_10(){
    context.lineWidth = 10;
    LWidth = 10;
    console.log("10");
  }
  function setLineWidth_20(){
    context.lineWidth = 20;
    LWidth = 20;
    console.log("10");
  }

  var w = canvas.width;
  var h = canvas.height;

  function drawLine(x0, y0, x1, y1, color ,width,emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    color = color === 'eraser'? '#263238' : color;
    context.strokeStyle = color;
    if(color === '#263238')
      context.lineWidth =  40;//color === "#263238" ? 40 : LWidth;
    else
      context.lineWidth = emit ? LWidth : width;
    context.stroke();
    context.closePath();
    if (!emit) { return; }
    socket.emit('drawing',roomName,{
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color,
      width : context.lineWidth,
    });
  }

  function onMouseDown(e){
    drawing = true;
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
  }

  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color,current.width,true);
  }

  function onMouseMove(e){
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color,current.width,true);
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
  }

  function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

})();