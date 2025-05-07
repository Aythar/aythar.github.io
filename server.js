const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  socket.on('create-room', ({ name, id }) => {
    const roomId = uuidv4();
    gamesLive[roomId] = { players: [id], moves: [], watchers: [] };
    socket.join(roomId);
    socket.emit("room-created", roomId);
  });

  socket.on('join-room', ({ id, name, uid }) => {
    const room = gamesLive[id];
    if (room && room.players.length < 2 && !room.players.includes(uid)) {
      room.players.push(uid);
      socket.join(id);
      io.to(id).emit("start-game", { id, opponentId: uid });
    }
  });

  socket.on('spectate', ({ roomId }) => {
    if (gamesLive[roomId]) {
      gamesLive[roomId].watchers.push(socket.id);
      socket.join(roomId);
    }
  });

  socket.on('move', ({ roomId, from, to }) => {
    const game = gamesLive[roomId];
    if (game) {
      game.moves.push({ from, to });
      io.to(roomId).emit("move-made", { from, to });
    }
  });
});
