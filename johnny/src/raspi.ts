import { LcdDisplay } from '@components/lcd-display'
import * as five from 'johnny-five'
import { EtherPortClient } from 'etherport-client'

import { Buzzer } from '@components/buzzer'
import { LedRgb } from '@components/led-rgb'
import { Motors } from '@components/motors'
// import { Sensor } from '@components/sensor'
import { Servo } from '@components/servo'
import { SevenSegmentLed } from '@components/seven-segment-led'
import { App } from './app'

export interface RaspiComponents {
  // needs nodemcu
  motors: Motors
  // needs mega
  sevenSegmentLed: SevenSegmentLed
  servo: Servo
  ledRgb: LedRgb
  buzzer: Buzzer
  lcdDisplay: LcdDisplay
  // needs uno
  // sensor: Sensor
}

const ports = [
  // mega
  { id: 'A', port: '/dev/ttyUSB0' },
  // uno
  // { id: 'B', port: '/dev/ttyACM0' },
  // nodemcu
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
  // boardsFn.uno = this[1]
  boardsFn.nodemcu = this[1]

  const raspiComponents: RaspiComponents = {
    motors: new Motors(boardsFn),
    sevenSegmentLed: new SevenSegmentLed(boardsFn),
    servo: new Servo(boardsFn),
    ledRgb: new LedRgb(boardsFn),
    buzzer: new Buzzer(boardsFn),
    lcdDisplay: new LcdDisplay(boardsFn),
    // sensor: new Sensor(boardsFn),
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app = new App(raspiComponents)

  // allows direct command line access
  boardsFn.boards.repl.inject({
    raspiComponents,
  })
})

export default boardsFn
