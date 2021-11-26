import * as five from 'johnny-five'
import songs from 'j5-songs'

import { BoardsFn } from '@raspi'

const BUZZER_PIN = 7

export class Buzzer {
  public buzzer: five.Piezo

  constructor(boardsFn: BoardsFn) {
    this.buzzer = new five.Piezo({
      pin: BUZZER_PIN,
      board: boardsFn.mega,
    })
  }

  public play = (song: string): void => this.buzzer.play(songs.load(song || 'mario-intro'))

  public stop = (): void => this.buzzer.off()
}
