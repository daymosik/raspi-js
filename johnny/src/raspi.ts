import { Buzzer } from '@components/buzzer'
import { LedRgb } from '@components/led-rgb'
import { Motors } from '@components/motors'
import { Sensor } from '@components/sensor'
import { Servo } from '@components/servo'
import { SevenSegmentLed } from '@components/seven-segment-led'
import * as five from 'johnny-five'
import { App } from './app'

export interface RaspiComponents {
  sevenSegmentLed: SevenSegmentLed
  servo: Servo
  sensor: Sensor
  motors: Motors
  ledRgb: LedRgb
  buzzer: Buzzer
}

const ports = [
  { id: 'A', port: '/dev/ttyUSB0' },
  { id: 'B', port: '/dev/ttyACM0' },
]

// const ports = ['A', 'B']

export interface BoardsFn {
  boards: five.Board.Collection
  mega: five.Board
  uno: five.Board
}

const boardsFn: BoardsFn = {
  boards: new five.Boards(ports),
  mega: undefined,
  uno: undefined,
}

console.log(boardsFn)

boardsFn.boards.on('ready', function() {
  boardsFn.mega = this[0]
  boardsFn.uno = this[1]

  const raspiComponents: RaspiComponents = {
    sevenSegmentLed: new SevenSegmentLed(boardsFn),
    servo: new Servo(),
    sensor: new Sensor(boardsFn),
    motors: new Motors(boardsFn),
    ledRgb: new LedRgb(boardsFn),
    buzzer: new Buzzer(boardsFn),
  }

  const app = new App(raspiComponents)

  // allows direct command line access
  boardsFn.boards.repl.inject({
    raspiComponents,
  })
})

export default boardsFn
