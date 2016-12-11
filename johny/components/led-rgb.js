import five from 'johnny-five';
import board from './board.js';

const LED_RGB_PINS = {
  red: 4,
  green: 5,
  blue: 6
};

const ledRGBFn = {
  ledRGB: undefined
};

board.on('ready', () => {

  ledRGBFn.ledRGB = five.Led.RGB({
    pins: LED_RGB_PINS,
    isAnode: true
  });

  board.repl.inject({
    ledRGBFn
  });

});

export default ledRGBFn;
