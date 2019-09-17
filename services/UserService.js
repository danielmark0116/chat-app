class UserService {
  constructor() {
    this.users = [];
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  addUser(newUser) {
    this.users = [newUser, ...this.users];
  }

  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}

module.exports = UserService;
