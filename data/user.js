

module.exports = class User {
    constructor(user_name, chat_room, room_status, message, time) {
        this.user_name = user_name;
        this.chat_room = chat_room;
        this.room_status = room_status ;
        // this.receiver_name = receiver_name;
        this.message = message;
        this.time = time;
    }
}