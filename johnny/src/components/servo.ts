import { BoardsFn } from '@raspi'
import * as five from 'johnny-five'

const SERVO_PIN = 2

export class Servo {
  public servo

  public constructor(boardsFn: BoardsFn) {
    this.servo = new five.Servo({
      pin: SERVO_PIN,
      center: true,
      range: [0, 180],
      // startAt: 1800,
      board: boardsFn.nodemcu,
      // deviceRange: [0, 3600],
      debug: true,
    })
  }

  public lookLeft = (): void => {
    // this.servo.to(3600)
    this.servo.max()
  }

  public lookRight = (): void => {
    // this.servo.to(0)
    this.servo.min()
  }

  public lookStraight = (): void => this.servo.center()

  public sweep = (): void => this.servo.sweep()

  public step = (rate: number): void => this.servo.step(rate)
}
