
class UserProfile {

    constructor(userid, userItems) {
        this.userid = userid;
        this.userItems = userItems;
    }

    addItem(userItem) {
        this.userItems.push(userItem);
    }

    removeItem(userItem) {
        this.userItems.remove(userItem);
    }

    updateItem(userItem) {
        this.userItems.update(userItem);
    }

    getItems() {
        return this.userItems;
    }

    emptyProfile() {
        this.userItems.removeall();
    }
  
    
  }
  
  module.exports = UserProfile;
  