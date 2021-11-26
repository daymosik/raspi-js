import * as five from 'johnny-five'
import { EtherPortClient } from 'etherport-client'

import { Buzzer } from '@components/buzzer'
import { LedRgb } from '@components/led-rgb'
import { Motors } from '@components/motors'
import { Sensor } from '@components/sensor'
import { Servo } from '@components/servo'
import { SevenSegmentLed } from '@components/seven-segment-led'
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
  {
    id: 'C',
    port: new EtherPortClient({
      host: '192.168.1.181',
      port: 3030,
    }),
  },
]

// const ports = ['A', 'B']

export interface BoardsFn {
  boards: five.Board.Collection
  mega: five.Board
  uno: five.Board
  nodemcu: five.Board
}

const boardsFn: BoardsFn = {
  boards: new five.Boards(ports),
  mega: undefined,
  uno: undefined,
  nodemcu: undefined,
}

export let app

boardsFn.boards.on('ready', function () {
  boardsFn.mega = this[0]
  boardsFn.uno = this[1]
  boardsFn.nodemcu = this[2]

  const raspiComponents: RaspiComponents = {
    sevenSegmentLed: new SevenSegmentLed(boardsFn),
    servo: new Servo(),
    sensor: new Sensor(boardsFn),
    motors: new Motors(boardsFn),
    ledRgb: new LedRgb(boardsFn),
    buzzer: new Buzzer(boardsFn),
  }

  const strobe = new five.Pin({
    pin: 16,
    board: boardsFn.nodemcu,
    mode: five.Pin.OUTPUT,
  })
  let state = 0x00

  this.loop(500, function () {
    strobe.write((state ^= 0x01))
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app = new App(raspiComponents)

  // allows direct command line access
  boardsFn.boards.repl.inject({
    raspiComponents,
  })
})

export default boardsFn
