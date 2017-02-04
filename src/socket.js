import io from 'socket.io-client';

// const SOCKET_ADDRESS = 'http://192.168.1.200:8090';
const SOCKET_ADDRESS = 'http://localhost:8090';

const socket = io.connect(SOCKET_ADDRESS, {
  reconnect: true
});

socket.on('connect', socket => {
  console.log('Connected!');
});

export default socket;
