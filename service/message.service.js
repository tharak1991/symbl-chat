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

exports.getLikelihood = (user_name) => {
    return getProbability(user_name);
}



exports.getAllUserChats = (user) => {
    return userData.chat_data;
}

getState = (key = 'general') => {
    return userData.chat_data.filter(user => user.chat_room == key)
        .sort((user1, user2) => user2.timestamp - user1.timestamp)
        .map(user => user.user_name + ' : ' + user.msg + ' at ' + user.time);
}

getProbability = (user_name) => {

    let likelihood = 'low';
    let status = 'user is not seen online in past 2 minutes';

    const current_timestamp = Date.now() / 1000;
    const last_seen = userData.chat_data.filter(user => user.user_name == user_name)
        .sort((user1, user2) => user2.timestamp - user1.timestamp)
        .map(user => user)[0];

    if (current_timestamp - last_seen.timestamp < 120) {
        likelihood = 'high';
        status = 'user is seen online in past 2 minutes';
    }

    return {
        likelihood: likelihood,
        status: status,
        user_name: user_name,
        last_seen: last_seen.time,
        last_msg: last_seen.msg,
        last_room: last_seen.chat_room
    }

}

// exports.getAllUsers = (user) => {
//     //return userData.chat_data.filter(user => user.room_status == 'joined');
//     return getUsers('general');
// }

exports.getAllRoomChats = (room = 'general') => {
    return getChats(room);
}




getChats = (key = 'general') => {
    return userData.chat_data.filter(user => user.chat_room == key)
        .map(user => user.msg);
}

getUsers = (key = 'general') => {
    return userData.chat_data.filter(user => user.chat_room == key)
        .map(user => user.user_name);
}