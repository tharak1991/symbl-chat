let userData = require('./../data/user-data') ;
let User = require('./../data/user');


userData.chat_data = [];



exports.logUserChats = (user) => {

user.time =  new Date().toLocaleString();

// let user = new User(user.user_name,user.chat_room,user.message,current_time);
userData.chat_data.push(user);
console.log(userData);

}

  
