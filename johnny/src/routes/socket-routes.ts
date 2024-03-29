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
    client.on('command.handleJoystick', (data) => raspiComponents.motors.handleJoystick(data))
    client.on('command.stopMotor', () => raspiComponents.motors.stop())
    client.on('command.moveServo', (data) => raspiComponents.servo[data.command](data.speed))
    client.on('command.openDoors', (data) => raspiComponents.motors.openDoors(data.speed))
    client.on('command.closeDoors', (data) => raspiComponents.motors.closeDoors(data.speed))
    client.on('command.stopDoors', () => raspiComponents.motors.stopDoors())

    client.on('command.lookLeft', () => raspiComponents.servo.lookLeft())
    client.on('command.lookRight', () => raspiComponents.servo.lookRight())
    client.on('command.lookStraight', () => raspiComponents.servo.lookStraight())

    // LCD  Display
    client.on('command.printLCD', (data) => raspiComponents.lcdDisplay.print(data.text))
    client.on('command.printLCDAutoscroll', (data) => raspiComponents.lcdDisplay.printAutoscroll(data.text))
    client.on('command.cleanLCD', () => raspiComponents.lcdDisplay.clean())

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

    // Buzzer
    client.on('command.playBuzzer', (data) => raspiComponents.buzzer.play(data.text))

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
