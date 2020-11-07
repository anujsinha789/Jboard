const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const { v4: uuidV4 } = require('uuid')


app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const rooms = { }
const users = { };

app.get('/', (req, res) => {
  res.render('Login', { rooms: rooms })
})

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('room', { roomName: req.params.room })
})



function onConnection(socket){
  socket.on('drawing', (room,data) => socket.to(room).broadcast.emit('drawing', data));
}




io.on('connection',socket => {
  // socket.on('room-id',(room) => {
  //   socket.join(room)
  // });
  socket.on('drawing',(room,data) => {
    socket.join(room);
    socket.to(room).broadcast.emit('drawing',data);
  });
  socket.on('new-user-joined',(room,name) => {
      socket.join(room)
      rooms[room].users[socket.id] = name;
      socket.to(room).broadcast.emit('user-joined',name);
  });

  socket.on('send', (room,message) => {
      socket.to(room).broadcast.emit('receive' , {message : message , name : rooms[room].users[socket.id]})
  });

  socket.on('disconnect', () => {
      getUserRooms(socket).forEach(room => {
        socket.to(room).broadcast.emit('left', rooms[room].users[socket.id])
        delete rooms[room].users[socket.id]
        if(Object.keys(rooms[room].users).length == 0){
          delete rooms[room];
        }
      })
  });
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}



http.listen(port, () => console.log('listening on port ' + port));





