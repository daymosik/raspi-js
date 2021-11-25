import { BoardsFn } from '@raspi'
import * as five from 'johnny-five'

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
const MOTORS_SPEED = 180
const MOTORS_TURN_SPEED = 180
const MOTORS_SWIPE_SPEED = 150

export class Motors {
  public motors
  public autoStopTime = MOTORS_AUTO_STOP_TIME
  public working = false

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

      boardsFn.boards[0].wait(MOTORS_AUTO_STOP_TIME, () => this.motors.stop())
    })

    // this.motors[0].on('stop', () => console.log('stop', Date.now()));
  }

  public turnLeft = (speed) => this.turn('left', speed)

  public turnRight = (speed) => this.turn('right', speed)

  public swipeLeft = () => this.swipe('left')

  public swipeRight = () => this.swipe('right')

  public goForward = (speed) => {
    this.working = true
    this.motors.forward(speed || MOTORS_SPEED)
    this.unsetWorking()
  }

  public goBack = (speed) => {
    this.working = true
    this.motors.reverse(speed || MOTORS_SPEED)
    this.unsetWorking()
  }

  public stop = () => {
    this.motors.stop()
    this.unsetWorking()
  }

  public unsetWorking = () => {
    setTimeout(() => {
      this.working = false
    }, MOTORS_AUTO_STOP_TIME)
  }

  public isWorking = () => this.working

  private turn = (direction: 'left' | 'right', speed) => this.move('turn', direction, speed || MOTORS_TURN_SPEED)

  private swipe = (direction: 'left' | 'right') => this.move('swipe', direction, MOTORS_SWIPE_SPEED)

  private move = (type: 'turn' | 'swipe', direction: 'left' | 'right', speed) => {
    this.working = true
    this.motors[direction === 'right' ? 0 : 1].forward(speed)
    this.motors[direction === 'right' ? 1 : 0].reverse(speed)
    this.unsetWorking()
  }
}
