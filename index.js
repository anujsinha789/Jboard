const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const { v4: uuidV4 } = require('uuid')


// app.use(express.static('public'));
app.get('/', (req,res) =>{
  res.sendFile(__dirname + '/public/Login.html'); 
})
app.get('/index.html',function(req,res){
  res.sendFile(__dirname + '/public/index.html'); 
});
app.get('/chat.js',function(req,res){
  res.sendFile(__dirname + '/public/chat.js'); 
});
app.get('/interaction_control.js',function(req,res){
  res.sendFile(__dirname + '/public/interaction_control.js'); 
});
app.get('/main.js',function(req,res){
  res.sendFile(__dirname + '/public/main.js'); 
});
app.get('/signin.css',function(req,res){
  res.sendFile(__dirname + '/public/signin.css'); 
});
app.get('/style.css',function(req,res){
  res.sendFile(__dirname + '/public/style.css'); 
});
app.get('/chat_style.css',function(req,res){
  res.sendFile(__dirname + '/public/chat_style.css'); 
});
app.get('/assets/brush_thickness.png',function(req,res){
  res.sendFile(__dirname + '/public/assets/brush_thickness.png'); 
});
app.get('/assets/chat_icon.png',function(req,res){
  res.sendFile(__dirname + '/public/assets/chat_icon.png'); 
});
app.get('/assets/send_btn.png',function(req,res){
  res.sendFile(__dirname + '/public/assets/send_btn.png'); 
});
app.get('/assets/clear_board.png',function(req,res){
  res.sendFile(__dirname + '/public/assets/clear_board.png'); 
});
app.get('/assets/color_pallete.png',function(req,res){
  res.sendFile(__dirname + '/public/assets/color_pallete.png'); 
});
app.get('/assets/color_picker_bg.jpg',function(req,res){
  res.sendFile(__dirname + '/public/assets/color_picker_bg.jpg'); 
});
app.get('/assets/color_picker.png',function(req,res){
  res.sendFile(__dirname + '/public/assets/color_picker.png'); 
});
app.get('/assets/brush_thickness.png',function(req,res){
  res.sendFile(__dirname + '/public/assets/brush_thickness.png'); 
});
app.get('/assets/WhiteBoard.png',function(req,res){
  res.sendFile(__dirname + '/public/assets/WhiteBoard.png'); 
});

app.get('/assets/sound.mp3',function(req,res){
  res.sendFile(__dirname + '/public/assets/sound.mp3'); 
});
// app.get('/logo.png',function(req,res){
//   res.sendFile(__dirname + '/public/logo.png'); 
// });


function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

// io.on('connection', onConnection);
const users = {};
io.on('connection',socket => {
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  socket.on('new-user-joined',name => {
      users[socket.id] = name;
      socket.broadcast.emit('user-joined',name);
  });

  socket.on('send', message => {
      socket.broadcast.emit('receive' , {message : message , name : users[socket.id]})
  });

  socket.on('disconnect', message => {
      socket.broadcast.emit('left' , users[socket.id]);
      delete users[socket.id];
  });
})



http.listen(port, () => console.log('listening on port ' + port));





