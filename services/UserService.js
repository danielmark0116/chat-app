class UserService {
  constructor() {
    this.users = [];
  }

  getAllUsers() {
    return this.users;
  }

  getNicknames() {
    return this.usersNicknames;
  }

  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  addUser(newUser) {
    this.users = [newUser, ...this.users];
  }

  isNameAvailable(nick) {
    if (this.users.find(user => user.name === nick)) {
      return false;
    }
    return true;
  }

  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}

module.exports = UserService;
