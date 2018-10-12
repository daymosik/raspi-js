import 'module-alias/register'
import raspiComponents from './raspi'

import * as express from 'express'

import ledRGBFn from '@components/led-rgb'
import motorsFn from '@components/motors'
import soundPlayer from '@services/sound-player'
import speechService from '@services/speech'
import yamaha from '@services/yamaha'

const http = require('http')
const serverPort = 8090
const app: express.Application = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
  path: '/chat/socket.io',
})
const ioListen = io.listen(server)

server.listen(serverPort)

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/api/yamaha/power-on', async (req, res) => {
  await yamaha.turnOn()
  res.send('ok')
})

app.get('/api/yamaha/power-off', async (req, res) => {
  await yamaha.turnOff()
  res.send('ok')
})

app.get('/api/yamaha/power-status', async (req, res) => {
  const isOn = await yamaha.isOn()
  res.send(isOn ? '1' : '0')
})

ioListen.on('connection', (client) => {
  client.on('disconnect', () => console.log('Client disconnected.'))

  // Johnny

  // Motors
  client.on('command.moveMotor', (data) => motorsFn[data.command](data.speed))
  // client.on('command.moveServo', data => servoFn[data.command](data.speed));

  // Seven segment led
  client.on('command.startSevenSegmentLed', () => (
    raspiComponents.sevenSegmentLed && raspiComponents.sevenSegmentLed.start()
  ))

  client.on('command.stopSevenSegmentLed', () => (
    raspiComponents.sevenSegmentLed && raspiComponents.sevenSegmentLed.stop()
  ))

  // RGB
  client.on('command.changeRGBColor', (data) => ledRGBFn.changeRGBColor(data.color))
  client.on('command.turnOffRGB', () => ledRGBFn.ledRGB && ledRGBFn.ledRGB.off())

  // Sound
  client.on('command.speak', (data) => speechService.speak(data.text))
  client.on('command.playRandomSound', () => soundPlayer.playRandomSound())

  // Yamaha
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
