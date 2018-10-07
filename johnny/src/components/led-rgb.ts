import * as five from 'johnny-five'
import boardsFn from './board'

// const LED_RGB_PINS = {
//   red: 4,
//   green: 5,
//   blue: 6,
// }

const LED_RGB_PINS = [4, 5, 6]

export interface LedRgb {
  ledRGB: five.Led.RGB | undefined
  changeRGBColor: (color) => void
}

const ledRGBFn: LedRgb = {
  ledRGB: undefined,
  changeRGBColor: (color) => ledRGBFn.ledRGB && ledRGBFn.ledRGB.color(color),
}

boardsFn.boards.on('ready', () => {

  ledRGBFn.ledRGB = new five.Led.RGB({
    pins: LED_RGB_PINS,
    isAnode: true,
    board: boardsFn.mega,
  })

  if (ledRGBFn.ledRGB) {
    ledRGBFn.ledRGB.off()
  }

  boardsFn.boards.repl.inject({
    ledRGBFn,
  })

})

export default ledRGBFn
