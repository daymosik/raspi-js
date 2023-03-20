import * as io from 'socket.io-client'

// const SOCKET_ADDRESS = 'https://raspi-js.ddns.net:443'
const SOCKET_ADDRESS = 'https://192.168.1.180:443'

const socket = io.connect(SOCKET_ADDRESS, {
  // reconnect: true,
  secure: true,
  rejectUnauthorized: false,
  path: '/chat/socket.io',
  // transports: ['websocket'],
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
