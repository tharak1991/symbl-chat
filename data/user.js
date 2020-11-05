/** 
 * User model
*/
module.exports = class User {
    constructor(user_name, chat_room, room_status, user_status, msg, time, timestamp) {
        this.user_name = user_name;
        this.chat_room = chat_room;
        this.room_status = room_status;
        this.user_status = user_status;
        this.msg = msg;
        this.time = time;
        this.timestamp = timestamp;
    }
}