import five from 'johnny-five';
import boardsFn from './board.js';

const LED_RGB_PINS = {
  red: 4,
  green: 5,
  blue: 6
};

const ledRGBFn = {
  ledRGB: undefined,
  changeRGBColor: color => ledRGBFn.ledRGB.color(color)
};

boardsFn.boards.on('ready', function() {

  ledRGBFn.ledRGB = five.Led.RGB({
    pins: LED_RGB_PINS,
    isAnode: true,
    board: boardsFn.mega
  });

  ledRGBFn.ledRGB.off();

  boardsFn.boards.repl.inject({
    ledRGBFn
  });

});

export default ledRGBFn;
