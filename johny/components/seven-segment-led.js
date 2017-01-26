import five from 'johnny-five';
import boardsFn from './board.js';

const SEVEN_LED_SEGMENT_PINS = {
  data: 31,
  clock: 33,
  latch: 32
};

const sevenLedFn = {
  led: undefined
};

let ledInterval = undefined;

boardsFn.boards.on('ready', function() {

  sevenLedFn.led = five.ShiftRegister({
    pins: SEVEN_LED_SEGMENT_PINS,
    board: boardsFn.mega
  });

  sevenLedFn.led.clear();

  sevenLedFn.start = () => {
    let number = 0;
    let decimal = 0;

    // Display numbers 0-9, one at a time in a loop.
    // Shows just the number for a half second, then
    // the number + a decimal point for a half second.
    ledInterval = setInterval(() => {
      sevenLedFn.led.display(number + (decimal && "."));

      if (decimal) {
        number++;
      }

      if (number > 9) {
        number = 0;
      }

      decimal ^= 1;
    }, 500);
  };

  sevenLedFn.stop = () => {
    if (ledInterval) {
      clearInterval(ledInterval);
    }
    sevenLedFn.led.clear();
  }

  boardsFn.boards.repl.inject({
    sevenLedFn
  });

});

export default sevenLedFn;
