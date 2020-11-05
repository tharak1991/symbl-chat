let userData = require('./../data/user-data');

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
        .sort((user1, user2) => user1.timestamp - user2.timestamp)
        .map(user => user.user_name + ' : ' + user.msg + ' at ' + user.time);
}

getProbability = (user_name) => {

    if (userData.chat_data.length == 0) {
        return {
            likelihood: 'nil',
            user_name: user_name,
            status: 'No users in channels'
        };
    }

    let likelihood = 'low';
    let status = 'user is not seen online in past 2 minutes';

    const current_timestamp = Date.now() / 1000;
    const last_seen = userData.chat_data.filter(user => user.user_name == user_name)
        .sort((user1, user2) => user2.timestamp - user1.timestamp)
        .map(user => user)[0];

     //logic: if user is last seen inside 2 minutes,likelihood will be high

    if (last_seen) {

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

    } else {
        return {
            likelihood: 'nil',
            user_name: user_name,
            status: 'No user in given username'
        };
    }


}


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