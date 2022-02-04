const express = require('express');
const path = require('path');
const http = require('http');
const SocketIO = require('socket.io');

const app = express();

app.use(express.static('public')); // static 파일을 요청 할 때의 root 경로는 public이다.

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/app.html'));
});

const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

io.on('connection', (socket) => {
  socket.join('room-1'); // room-1이라는 방에 참여

  // my-message 이벤트 리스너
  socket.on('my-message', (message) => {
    socket.to('room-1').emit('others-message', message);
  });
});

httpServer.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
