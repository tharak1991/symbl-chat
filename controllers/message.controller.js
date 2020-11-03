let message_service = require('./../service/message.service') ;


exports.getAllUserChats = () => {
    const user_chats =  message_service.getAllUserChats() ;
    return  user_chats ;   
}

