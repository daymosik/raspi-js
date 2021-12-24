import * as five from 'johnny-five'

import { BoardsFn } from '@raspi'

export class LcdDisplay {
  public display: five.LCD

  constructor(boardsFn: BoardsFn) {
    this.display = new five.LCD({
      board: boardsFn.mega,
      controller: 'PCF8574',
    })
  }

  public print = (text: string): void => this.display.print(text)
}
