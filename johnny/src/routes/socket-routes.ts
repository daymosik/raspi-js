import * as io from 'socket.io'

import { RaspiComponents } from '@raspi'
import soundPlayer from '@services/sound-player'
import speechService from '@services/speech'
import yamaha from '@services/yamaha'

export class SocketRoutes {
  public routes(client: io.Socket, raspiComponents: RaspiComponents): void {
    client.on('disconnect', () => console.log('Client disconnected.'))

    // Johnny

    // Motors
    client.on('command.moveMotor', (data) => raspiComponents.motors[data.command](data.speed))
    // client.on('command.moveServo', data => servoFn[data.command](data.speed));

    // Seven segment led
    client.on('command.startSevenSegmentLed', () => raspiComponents.sevenSegmentLed.start())
    client.on('command.stopSevenSegmentLed', () => raspiComponents.sevenSegmentLed.stop())
    client.on('command.setSevenSegmentLed', (n) => raspiComponents.sevenSegmentLed.setNumber(n))

    // RGB
    client.on('command.changeRGBColor', (data) => raspiComponents.ledRgb.changeRGBColor(data.color))
    client.on('command.turnOffRGB', () => raspiComponents.ledRgb.ledRGB.off())

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
  }
}
