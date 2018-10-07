import io from 'socket.io-client';

// const SOCKET_ADDRESS = 'https://raspi-js.ddns.net:443';
const SOCKET_ADDRESS = 'http://raspi-js.ddns.net:8090';
// const SOCKET_ADDRESS = 'http://192.168.1.200:8090';
// const SOCKET_ADDRESS = 'http://localhost:8090';

const socket = io.connect(SOCKET_ADDRESS, {
  reconnect: true,
  secure: true,
});

socket.on('connect', () => {
  console.log('Connected!');
});

export default socket;
