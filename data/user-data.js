// class UserData {
//     constructor(chat_data) {
//         this.chat_data = chat_data;
//     }
// }

// const dataInstance = new UserData();
// Object.freeze(dataInstance);

// module.exports = dataInstance ;



class UserData {
     chat_data = [] ;
    

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