/**
 * Message controller
 */

let message_service = require('./../service/message.service');


exports.getAllUserChats = () => {
    const user_chats = message_service.getAllUserChats();
    return user_chats;
}


exports.getAllRoomChats = () => {
    const chats = message_service.getAllRoomChats();
    return chats;
}


exports.getRoomState = (room) => {
    const state = message_service.getRoomState(room);
    return state;
}

exports.getlikelihood = (user_name) => {
    const user_likelihood = message_service.getLikelihood(user_name);
    return user_likelihood;
}