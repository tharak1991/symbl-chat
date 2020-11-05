/**
 * Socket logic
 */

const socket = require('socket.io');
let User = require('./../data/user');
let userData = require('./../data/user-data');
let messageService = require('./../service/message.service');


userData.chat_data = [];

// general variables to hold all usernames and rooms created
let usernames = {};
let rooms = ['general', 'symbl', 'random'];

module.exports.start = io => {
  io.on('connection', async (socket) => {

    console.log('User connected to server.');

    socket.on('createUser', async (username) => {
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


    socket.on('sendMessage', async (data) => {

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


    socket.on('createRoom', async (room) => {

      if (room != null) {
        rooms.push(room);
        io.sockets.emit('updateRooms', rooms, null);
      }
    });


    socket.on('updateRooms', async (room) => {

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

    socket.on('disconnect', async () => {
      delete usernames[socket.username];
      io.sockets.emit('updateUsers', usernames);
      socket.broadcast.emit('updateChat', 'INFO', socket.username + ' has disconnected');
    });


  });
};