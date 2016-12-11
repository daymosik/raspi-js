import five from 'johnny-five';
import songs from 'j5-songs';
import board from './board.js';

const BUZZER_PIN = 7;

const buzzerFn = {
  buzzer: undefined
};

board.on('ready', () => {

  buzzerFn.buzzer = five.Piezo({
    pin: BUZZER_PIN
  });

  buzzerFn.play = song => (
    buzzerFn.buzzer.play(songs.load(song || 'mario-intro'))
  );

  buzzerFn.stop = () => buzzerFn.buzzer.off();

  board.repl.inject({
    buzzerFn
  });

});

export default buzzerFn;
