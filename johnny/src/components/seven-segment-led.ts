import * as five from 'johnny-five'

import { BoardsFn } from '@raspi'

const SEVEN_LED_SEGMENT_PINS = {
  data: 31,
  clock: 33,
  latch: 32,
}

export class SevenSegmentLed {
  private led: five.ShiftRegister
  private ledInterval

  constructor(boardsFn: BoardsFn) {
    this.led = new five.ShiftRegister({
      pins: SEVEN_LED_SEGMENT_PINS,
      board: boardsFn.mega,
    })
  }

  public setNumber = (n: number): void => this.led.display(n)

  public start = (): void => {
    let num = 0
    let decimal = false

    this.ledInterval = setInterval(() => {
      this.led.display(`${num}${decimal && '.'}`)

      if (decimal) {
        num++
      }

      if (num > 9) {
        num = 0
      }

      decimal = !decimal
    }, 500)
  }

  public stop = (): void => {
    if (this.ledInterval) {
      clearInterval(this.ledInterval)
    }
    if (this.led) {
      this.led.clear()
    }
  }
}
