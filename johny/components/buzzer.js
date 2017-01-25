import five from 'johnny-five';
import songs from 'j5-songs';
import boardsFn from './board.js';

const BUZZER_PIN = 7;

const buzzerFn = {
  buzzer: undefined
};

boardsFn.boards.on('ready', function() {

  buzzerFn.buzzer = five.Piezo({
    pin: BUZZER_PIN,
    board: boardsFn.mega
  });

  buzzerFn.play = song => (
    buzzerFn.buzzer.play(songs.load(song || 'mario-intro'))
  );

  buzzerFn.stop = () => buzzerFn.buzzer.off();

  boardsFn.boards.repl.inject({
    buzzerFn
  });

});

export default buzzerFn;
