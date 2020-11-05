const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const message_route = require('./routes/message.route');
let User = require('./data/user');
let userData = require('./data/user-data');
let messageService = require('./service/message.service');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));

const server = app.listen(port, function () {
  console.log('Listening to port' + port );
});

const io = socket(server);


let users = [];
userData.chat_data = [];

// general variables to hold all usernames and rooms created
let usernames = {};
let rooms = ['general', 'symbl', 'random'];

io.on('connection', function (socket) {

  console.log('User connected to server.');

  socket.on('createUser', function (username) {
    socket.username = username;
    usernames[username] = username;
    socket.currentRoom = 'general';
    socket.join('general');

    if (socket.username) {
      let room_status = 'joined';
      let user_status = socket.username + '' + room_status + +'' + socket.currentRoom + ' room ';
      let user = new User(socket.username, socket.currentRoom, room_status,
        user_status, ' just joined ', '', '');
      socket.emit('updateChat', 'INFO', 'You have joined general room');
      messageService.logUserChats(user);
    }

    socket.broadcast
      .to('general')
      .emit('updateChat', 'INFO', username + ' has joined general room');
    io.sockets.emit('updateUsers', usernames);
    socket.emit('updateRooms', rooms, 'general');
  });


  socket.on('sendMessage', function (data) {

    if (socket.username) {
      let room_status = 'sent message';
      let user_status = socket.username + +'' + room_status + '' + socket.currentRoom + ' room ';
      let user = new User(socket.username, socket.currentRoom, room_status,
        user_status, data, '', '');
      messageService.logUserChats(user);
    }


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

    socket.currentRoom = room;
    socket.join(room);
    socket.emit('updateChat', 'INFO', 'You have joined ' + room + ' room');

    socket.broadcast
      .to(room)
      .emit('updateChat', 'INFO', socket.username + ' has joined ' + room + ' room');
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

  app.use('/message/', message_route);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });

  exports.server = server;

});