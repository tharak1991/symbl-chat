/** 
 * UserData model
*/

class UserData {
  chat_data = [];


  constructor() {
    if (!UserData._instance) {
      UserData._instance = this;
    }
    return UserData._instance;
  }

  static getInstance() {
    return this._instance;
  }
}

module.exports = UserData;