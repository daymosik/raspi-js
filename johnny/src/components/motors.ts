import * as five from 'johnny-five'

import { BoardsFn } from '@raspi'
import joystickHelper from '../helpers/joystick'
import { JoystickCoords, JoystickDirection } from '../models/motors'

const MOTORS_PINS_NODEMCU = [
  {
    pins: {
      pwm: 4,
      dir: 12,
      cdir: 14,
    },
  },
  {
    pins: {
      pwm: 5,
      dir: 13,
      cdir: 15,
    },
  },
]

// const MOTORS_PINS_MEGA = [{
//   pins: {
//     pwm: 3,
//     dir: 35,
//     cdir: 34
//   }
// }, {
//   pins: {
//     pwm: 2,
//     dir: 36,
//     cdir: 37
//   }
// }];

// const MOTORS_PINS_UNO = [
//   {
//     pins: {
//       pwm: 6,
//       dir: 8,
//       cdir: 7,
//     },
//   },
//   {
//     pins: {
//       pwm: 5,
//       dir: 9,
//       cdir: 10,
//     },
//   },
// ]

const MOTORS_AUTO_STOP_TIME = 500
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MOTORS_SPEED = 180
const MOTORS_TURN_SPEED = 180
const MOTORS_SWIPE_SPEED = 150

export class Motors {
  public motors
  public autoStopTime: number = MOTORS_AUTO_STOP_TIME
  public working = false

  public coords: JoystickCoords = { x: 0, y: 0 }
  public joystickControl = false

  constructor(boardsFn: BoardsFn) {
    this.motors = new five.Motors([
      {
        pins: MOTORS_PINS_NODEMCU[0].pins,
        board: boardsFn.nodemcu,
      },
      {
        pins: MOTORS_PINS_NODEMCU[1].pins,
        board: boardsFn.nodemcu,
      },
    ])

    this.motors[0].on('start', () => {
      // console.log('start', Date.now());

      boardsFn.boards[0].wait(MOTORS_AUTO_STOP_TIME, () => {
        if (!this.joystickControl) {
          this.motors.stop()
        }
      })
    })

    // this.motors[0].on('stop', () => console.log('stop', Date.now()));
  }

  public handleJoystick = (coords: JoystickCoords): void => {
    this.coords = coords

    if (this.isWorking()) {
      return
    }

    this.joystickControl = true

    const direction = joystickHelper.getJoystickDirection(this.coords)
    const speed = joystickHelper.getSpeedFromCoords(this.coords)

    console.log(direction, speed)

    if (!direction || !speed) {
      this.stop()
      return
    }

    this.moveJoystick(direction, speed)
  }

  public turnLeft = (speed: number): void => this.turn('left', speed)

  public turnRight = (speed: number): void => this.turn('right', speed)

  public swipeLeft = (): void => this.swipe('left')

  public swipeRight = (): void => this.swipe('right')

  public goForward = (speed: number): void => {
    this.working = true
    this.motors.forward(speed)
    this.unsetWorking()
  }

  public goBack = (speed: number): void => {
    this.working = true
    this.motors.reverse(speed)
    this.unsetWorking()
  }

  public stop = (): void => {
    this.joystickControl = false

    this.motors.stop()
    this.unsetWorking()
  }

  public unsetWorking = (): void => {
    setTimeout(() => {
      this.working = false
    }, MOTORS_AUTO_STOP_TIME)
  }

  public isWorking = (): boolean => this.working

  private turn = (direction: 'left' | 'right', speed: number): void =>
    this.complexMove('turn', direction, speed || MOTORS_TURN_SPEED)

  private swipe = (direction: 'left' | 'right', speed?: number): void =>
    this.complexMove('swipe', direction, speed || MOTORS_SWIPE_SPEED)

  private complexMove = (moveType: 'turn' | 'swipe', direction: 'left' | 'right', speed: number): void => {
    this.working = true
    if (moveType === 'turn') {
      this.motors[direction === 'right' ? 0 : 1].forward(speed)
      this.motors[direction === 'right' ? 1 : 0].reverse(speed)
    } else if (moveType === 'swipe') {
      this.motors[direction === 'right' ? 0 : 1].forward(speed)
      this.motors[direction === 'right' ? 1 : 0].forward(speed / 2)
    }
    this.unsetWorking()
  }

  private moveJoystick = (direction: JoystickDirection, speed: number): void => {
    switch (direction) {
      case 'up':
        this.goForward(speed)
        break
      case 'up-left':
        this.swipe('left', speed)
        break
      case 'up-right':
        this.swipe('right', speed)
        break
      case 'left':
        this.turnLeft(speed)
        break
      case 'right':
        this.turnRight(speed)
        break
      case 'down':
        this.goBack(speed)
        break
      case 'down-left':
        // TODO
        break
      case 'down-right':
        // TODO
        break
      case null:
        this.stop()
    }
  }
}
