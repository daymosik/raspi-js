import { io } from 'socket.io-client'

const SOCKET_ADDRESS = 'https://daymosik.freemyip.com:443'
// const SOCKET_ADDRESS = 'https://192.168.1.180:443'

const socket = io(SOCKET_ADDRESS, {
  path: '/chat/socket.io',
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
