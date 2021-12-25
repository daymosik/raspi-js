import * as five from 'johnny-five'

import { BoardsFn } from '@raspi'

export class LcdDisplay {
  public display: five.LCD

  constructor(boardsFn: BoardsFn) {
    this.display = new five.LCD({
      board: boardsFn.mega,
      controller: 'PCF8574',
      rows: 2,
      cols: 16,
    })
  }

  public printAutoscroll = (text: string): void => {
    this.clean()
    this.display.autoscroll().print(text)
  }

  public print = (text: string): void => {
    this.clean()
    this.display.noAutoscroll().print(text)
  }

  public clean = (): void => this.display.clean()
}
