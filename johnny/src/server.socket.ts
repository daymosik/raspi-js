// import servoFn from './johny/components/servo';
// import Exploration from './johny/functions/exploration';
// import exploration from './johny/raspi.ts';
import ledRGBFn from './components/led-rgb'
import motorsFn from './components/motors'
import Player from './functions/play'
import Speech from './functions/speech'

// tslint:disable-next-line no-var-requires
const server = require('http').createServer()
// tslint:disable-next-line no-var-requires
let io = require('socket.io')
const speach = new Speech()
const player = new Player()

server.listen(8090)
io = io.listen(server)

io.on('connection', (client) => {

  client.on('event', () => {
    // TODO
  })
  client.on('disconnect', () => console.log('Client disconnected.'))

  // Johny
  client.on('command.moveMotor', (data) => motorsFn[data.command](data.speed))
  // client.on('command.moveServo', data => servoFn[data.command](data.speed));
  client.on('command.changeRGBColor', (data) => ledRGBFn.changeRGBColor(data.color))
  client.on('command.turnOffRGB', () => {
    if (ledRGBFn.ledRGB !== undefined) {
      ledRGBFn.ledRGB.off()
    }
  })

  client.on('command.speak', (data) => speach.speak(data.text))
  client.on('command.playRandomSound', () => player.playRandomSound())

  console.log('Client connected.')
})

export default io
