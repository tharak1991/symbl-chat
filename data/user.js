

module.exports = class User {
    constructor(user_name, receiver_name, message, time) {
        this.user_name = user_name;
        this.receiver_name = receiver_name;
        this.message = message;
        this.time = time;
    }
}