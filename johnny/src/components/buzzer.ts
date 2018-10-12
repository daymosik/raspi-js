import boardsFn from '@components/board'
import songs from 'j5-songs'
import * as five from 'johnny-five'

const BUZZER_PIN = 7

export interface BuzzerFn {
  buzzer: five.Piezo | undefined,
  stop: () => void,
  play: (song) => void
}

const buzzerFn: BuzzerFn = {
  buzzer: undefined,
  stop: () => {
    // TODO
  },
  play: (song) => {
    // TODO
  },
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
