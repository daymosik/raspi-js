import { BoardsFn } from '@components/board'
import * as five from 'johnny-five'

const SEVEN_LED_SEGMENT_PINS = {
  data: 31,
  clock: 33,
  latch: 32,
}

export class SevenSegmentLed {
  private led
  private ledInterval

  constructor(boardsFn: BoardsFn) {
    this.led = new five.ShiftRegister({
      pins: SEVEN_LED_SEGMENT_PINS,
      board: boardsFn.mega,
    })
  }

  public start = () => {
    let num = 0
    let decimal = 0

    // Display numbers 0-9, one at a time in a loop.
    // Shows just the num for a half second, then
    // the num + a decimal point for a half second.
    this.ledInterval = setInterval(() => {
      if (this.led) {
        this.led.display(`${num}${(decimal && '.')}`)
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

  public stop = () => {
    if (this.ledInterval) {
      clearInterval(this.ledInterval)
    }
    if (this.led) {
      this.led.clear()
    }
  }
}
