let userData = require('./../data/user-data');
let User = require('./../data/user');


userData.chat_data = [];



exports.logUserChats = (user) => {
    user.time = new Date().toLocaleString();
    user.timestamp = Date.now() / 1000;
    userData.chat_data.push(user);
    console.log(userData);
}

exports.getRoomState = (room = 'general') => {
    return getState(room);
}


exports.getAllUserChats = (user) => {
    return userData.chat_data;
}

// exports.getAllUsers = (user) => {
//     //return userData.chat_data.filter(user => user.room_status == 'joined');
//     return getUsers('general');
// }

exports.getAllRoomChats = (room = 'general') => {
    return getChats(room);
}

getState = (key = 'general') => {
    return userData.chat_data.filter(user => user.chat_room == key)
        .sort((user1, user2) => user2.timestamp - user1.timestamp)
        .map(user => user.user_name + ' : ' + user.msg + ' at ' + user.time);
}


getChats = (key = 'general') => {
    return userData.chat_data.filter(user => user.chat_room == key)
        .map(user => user.msg);
}

getUsers = (key = 'general') => {
    return userData.chat_data.filter(user => user.chat_room == key)
        .map(user => user.user_name);
}