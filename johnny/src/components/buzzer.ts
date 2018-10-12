import { BoardsFn } from '@raspi'
import songs from 'j5-songs'
import * as five from 'johnny-five'

const BUZZER_PIN = 7

export class Buzzer {
  public buzzer: five.Piezo

  constructor(boardsFn: BoardsFn) {
    this.buzzer = new five.Piezo({
      pin: BUZZER_PIN,
      board: boardsFn.mega,
    })
  }

  public play = (song) => this.buzzer.play(songs.load(song || 'mario-intro'))

  public stop = () => this.buzzer.off()
}
