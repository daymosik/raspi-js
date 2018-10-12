import * as five from 'johnny-five'

const SERVO_PIN = 11

export class Servo {
  public servo

  public constructor() {
    this.servo = new five.Servo({
      pin: SERVO_PIN,
      center: true,
      range: [0, 180],
    })
  }

  public lookLeft = (): void => this.servo.to(160)

  public lookRight = (): void => this.servo.to(20)

  public lookStraight = (): void => this.servo.center()
}
