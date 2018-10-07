import * as five from 'johnny-five'
import boardsFn from './board'

const SEVEN_LED_SEGMENT_PINS = {
  data: 31,
  clock: 33,
  latch: 32,
}

export interface SevenSegmentLed {
  led: five.ShiftRegister | undefined
  start: () => void
  stop: () => void
}

const sevenLedFn: SevenSegmentLed = {
  led: undefined,
  // tslint:disable-next-line no-empty
  start: () => {},
  // tslint:disable-next-line no-empty
  stop: () => {},
}

let ledInterval

boardsFn.boards.on('ready', () => {

  sevenLedFn.led = new five.ShiftRegister({
    pins: SEVEN_LED_SEGMENT_PINS,
    board: boardsFn.mega,
  })

  if (sevenLedFn.led) {
    sevenLedFn.led.clear()
  }

  sevenLedFn.start = () => {
    let num = 0
    let decimal = 0

    // Display numbers 0-9, one at a time in a loop.
    // Shows just the num for a half second, then
    // the num + a decimal point for a half second.
    ledInterval = setInterval(() => {
      if (sevenLedFn.led) {
        sevenLedFn.led.display(`${num}${(decimal && '.')}`)
      }

      if (decimal) {
        num++
      }

      if (num > 9) {
        num = 0
      }

      // TODO
      // tslint:disable-next-line no-bitwise
      decimal ^= 1
    }, 500)
  }

  sevenLedFn.stop = () => {
    if (ledInterval) {
      clearInterval(ledInterval)
    }
    if (sevenLedFn.led) {
      sevenLedFn.led.clear()
    }
  }

  boardsFn.boards.repl.inject({
    sevenLedFn,
  })

})

export default sevenLedFn
