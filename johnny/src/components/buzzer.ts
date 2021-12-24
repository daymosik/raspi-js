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

  public play = (song?: string): void => {
    try {
      const fileName = song || 'mario-intro'
      const songFile = songs.load(fileName)
      this.buzzer.play(songFile)
    } catch (e) {
      console.log('buzzer-error', e)
    }
  }

  public stop = (): void => this.buzzer.off()
}
