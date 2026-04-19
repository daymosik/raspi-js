import { io } from 'socket.io-client'

const SOCKET_ADDRESS = 'https://daymosik.freemyip.com:5000'

const socket = io(SOCKET_ADDRESS, {
  path: '/chat/socket.io',
})

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
