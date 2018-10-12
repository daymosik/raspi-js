import ledRGBFn from '@components/led-rgb'
import motorsFn from '@components/motors'
import soundPlayer from '@services/sound-player'
import speechService from '@services/speech'
import yamaha from '@services/yamaha'

const fs = require('fs')

const options = {
  key: fs.readFileSync('./cert/file.pem'),
  cert: fs.readFileSync('./cert/file.crt'),
}
const serverPort = 443
const server = require('https').createServer(options)
const io = require('socket.io')(server)
server.listen(serverPort)
const ioListen = io.listen(server)

ioListen.on('connection', (client) => {
  client.on('disconnect', () => console.log('Client disconnected.'))

  // Johnny
  client.on('command.moveMotor', (data) => motorsFn[data.command](data.speed))
  // client.on('command.moveServo', data => servoFn[data.command](data.speed));
  client.on('command.changeRGBColor', (data) => ledRGBFn.changeRGBColor(data.color))
  client.on('command.turnOffRGB', () => ledRGBFn.ledRGB && ledRGBFn.ledRGB.off())

  client.on('command.speak', (data) => speechService.speak(data.text))
  client.on('command.playRandomSound', () => soundPlayer.playRandomSound())

  client.on('command.yamaha.muteOn', () => yamaha.muteOn())
  client.on('command.yamaha.muteOff', () => yamaha.muteOff())
  client.on('command.yamaha.turnOn', () => yamaha.turnOn())
  client.on('command.yamaha.turnOff', () => yamaha.turnOff())
  client.on('command.yamaha.turnOnTv', () => yamaha.turnOnTv())
  client.on('command.yamaha.turnOnAppleTv', () => yamaha.turnOnAppleTv())
  client.on('command.yamaha.turnOnPlaystation', () => yamaha.turnOnPlaystation())
  client.on('command.yamaha.volumeUp', () => yamaha.volumeUp())
  client.on('command.yamaha.volumeDown', () => yamaha.volumeDown())

  console.log('Client connected.')
})

export default io
