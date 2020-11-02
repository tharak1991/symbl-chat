var express = require('express');
var socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const message_route = require('./routes/message.route');
let User = require('./data/user');
let userData = require('./data/user-data');
let messageService = require('./service/message.service');

var app = express();

app.use(express.static('public'));

var server = app.listen(5000, function () {
  console.log('Listening to port 5000.');
});

var io = socket(server);


let users = [];
userData.chat_data = [];

// general variables to hold all usernames and rooms created
var usernames = {};
var rooms = ['general', 'symbl', 'random'];

io.on('connection', function (socket) {

  console.log('User connected to server.');

  socket.on('createUser', function (username) {
    socket.username = username;
    usernames[username] = username;
    socket.currentRoom = 'general';
    socket.join('general');
    socket.emit('updateChat', 'INFO', 'You have joined general room');

    //logic
    if (username) {
      let user = new User(username, socket.currentRoom, 'joined',
        username + ' joined ' + socket.currentRoom + ' room ', '');
      messageService.logUserChats(user);
    }


    socket.broadcast
      .to('general')
      .emit('updateChat', 'INFO', username + ' has joined general room');
    io.sockets.emit('updateUsers', usernames);
    socket.emit('updateRooms', rooms, 'general');
  });


  socket.on('sendMessage', function (data) {

    io.sockets
      .to(socket.currentRoom)
      .emit('updateChat', socket.username, data);
  });


  socket.on('createRoom', function (room) {

    if (room != null) {
      rooms.push(room);
      io.sockets.emit('updateRooms', rooms, null);
    }
  });


  socket.on('updateRooms', function (room) {

    socket.broadcast
      .to(socket.currentRoom)
      .emit('updateChat', 'INFO', socket.username + ' left room');
    socket.leave(socket.currentRoom);

    //logic
    if (socket.username) {
      let user = new User(socket.username, socket.currentRoom, 'left', '',
        socket.username + ' left ' + socket.currentRoom + ' room ', '');
      messageService.logUserChats(user);
    }

    socket.currentRoom = room;
    socket.join(room);
    socket.emit('updateChat', 'INFO', 'You have joined ' + room + ' room');

    if (socket.username) {
      let user = new User(socket.username, socket.currentRoom, 'joined', '',
        socket.username + ' joined ' + socket.currentRoom + ' room ', '');
      messageService.logUserChats(user);
    }

    socket.broadcast
      .to(room)
      .emit('updateChat', 'INFO', socket.username + ' has joined ' + room + ' room');
  });
  
   //logic
   socket.on('updatUserChat', function () {
    if (socket.username) {
      let user = new User(socket.username, socket.currentRoom, 'online',
      socket.username + ' chatting in ' + socket.currentRoom + ' room ', '');
      messageService.logUserChats(user);
    }  
   });
  
  socket.on('disconnect', function () {
    delete usernames[socket.username];
    io.sockets.emit('updateUsers', usernames);
    socket.broadcast.emit('updateChat', 'INFO', socket.username + ' has disconnected');
  });


  app.use(morgan('dev'));
  app.use(bodyParser.json({
    limit: '50mb',
    extended: true,
  }));
  app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: '50mb',
  }));
  app.use(compression());
  app.use(cookieParser());
  app.use(cors());

  // app.use('/room/', room_route);
  app.use('/message/', message_route);

  // app.use('*', (req, res) => {
  //     res.sendStatus(404);
  // });



});