let userData = require('./../data/user-data') ;
let User = require('./../data/user');


userData.chat_data = [];



exports.logUserChats = (user) => {

user.time =  new Date().toLocaleString();
userData.chat_data.push(user);
console.log(userData);

}


exports.getAllUserChats = (user) => {
    return userData.chat_data ;    
}

  
