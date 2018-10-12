import { BoardsFn } from '@raspi'
import * as five from 'johnny-five'

// const LED_RGB_PINS = {
//   red: 4,
//   green: 5,
//   blue: 6,
// }

const LED_RGB_PINS = [4, 5, 6]

export class LedRgb {
  public ledRGB: five.Led.RGB

  constructor(boardsFn: BoardsFn) {
    this.ledRGB = new five.Led.RGB({
      pins: LED_RGB_PINS,
      isAnode: true,
      board: boardsFn.mega,
    })

    if (this.ledRGB) {
      this.ledRGB.off()
    }
  }

  public changeRGBColor = (color: string): void => this.ledRGB.color(color)
}
