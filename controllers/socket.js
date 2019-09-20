module.exports = function(io, userService) {
  io.on('connection', socket => {
    console.log('SockeIO: socket opened');

    socket.on('join', name => {
      if (userService.isNameAvailable(name)) {
        console.log('SockeIO: New user joined the channel');

        userService.addUser({
          id: socket.id,
          name
        });

        io.emit('update', userService.getAllUsers());

        socket.emit('nameTaken', false);

        socket.emit('userDisconnected', false);
      } else {
        console.log('SocketIO: user already is logged');

        socket.emit('nameTaken', true);
      }
    });

    io.emit('update', userService.getAllUsers());

    socket.on('leaveChat', () => {
      console.log('SockeIO: User left the channel');

      socket.emit('userDisconnected', true);

      socket.emit('disconnect');
    });

    socket.on('disconnect', () => {
      console.log('SockeIO: User disconnected from the channel');

      userService.removeUser(socket.id);

      socket.broadcast.emit('update', userService.getAllUsers());

      socket.emit('userDisconnected', true);
    });

    socket.on('message', msg => {
      const { name } = userService.getUserById(socket.id);

      socket.emit('message', {
        msg: msg,
        from: name
      });

      socket.broadcast.emit('message', {
        msg: msg,
        from: name
      });
    });
  });
};
