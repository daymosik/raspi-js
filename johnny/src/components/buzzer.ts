import songs from 'j5-songs'
import * as five from 'johnny-five'
import boardsFn from './board'

const BUZZER_PIN = 7

export interface BuzzerFn {
  buzzer: five.Piezo | undefined,
  stop: () => void,
  play: (song) => void
}

const buzzerFn: BuzzerFn = {
  buzzer: undefined,
  // tslint:disable-next-line no-empty
  stop: () => {},
  // tslint:disable-next-line no-empty
  play: (song) => {},
}

boardsFn.boards.on('ready', () => {

  buzzerFn.buzzer = new five.Piezo({
    pin: BUZZER_PIN,
    board: boardsFn.mega,
  })

  buzzerFn.play = (song) => (
    buzzerFn.buzzer && buzzerFn.buzzer.play(songs.load(song || 'mario-intro'))
  )

  buzzerFn.stop = () => buzzerFn.buzzer && buzzerFn.buzzer.off()

  boardsFn.boards.repl.inject({
    buzzerFn,
  })

})

export default buzzerFn
