import io from 'socket.io-client';

const SOCKET_ADDRESS = 'http://192.168.1.200:8080';
// const SOCKET_ADDRESS = 'http://localhost:8080';

const socket = io.connect(SOCKET_ADDRESS, {
  reconnect: true
});

socket.on('connect', socket => {
  console.log('Connected!');
});

export default socket;
