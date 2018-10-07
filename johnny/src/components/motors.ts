import * as five from 'johnny-five'
import io from '../server.socket'
import boardsFn from './board'

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

const MOTORS_PINS_UNO = [{
  pins: {
    pwm: 6,
    dir: 8,
    cdir: 7,
  },
}, {
  pins: {
    pwm: 5,
    dir: 9,
    cdir: 10,
  },
}]

const MOTORS_AUTO_STOP_TIME = 500
const MOTORS_SPEED = 180
const MOTORS_TURN_SPEED = 180
const MOTORS_SWIPE_SPEED = 150

let motors

const motorsFn = {
  autoStopTime: MOTORS_AUTO_STOP_TIME,
  working: false,
  turnLeft: (speed) => {
    motorsFn.setWorking()
    motors[1].forward(speed || MOTORS_TURN_SPEED)
    motors[0].reverse(speed || MOTORS_TURN_SPEED)
    motorsFn.unsetWorking()
  },
  turnRight: (speed) => {
    motorsFn.setWorking()
    motors[0].forward(speed || MOTORS_TURN_SPEED)
    motors[1].reverse(speed || MOTORS_TURN_SPEED)
    motorsFn.unsetWorking()
  },
  swipeLeft: () => {
    motorsFn.setWorking()
    motors[1].forward(MOTORS_SWIPE_SPEED)
    motors[0].reverse(MOTORS_SWIPE_SPEED)
    motorsFn.unsetWorking()
  },
  swipeRight: () => {
    motorsFn.setWorking()
    motors[0].forward(MOTORS_SWIPE_SPEED)
    motors[1].reverse(MOTORS_SWIPE_SPEED)
    motorsFn.unsetWorking()
  },
  goForward: (speed) => {
    motorsFn.setWorking()
    motors.forward(speed || MOTORS_SPEED)
    motorsFn.unsetWorking()
  },
  goBack: (speed) => {
    motorsFn.setWorking()
    motors.reverse(speed || MOTORS_SPEED)
    motorsFn.unsetWorking()
  },
  stop: () => {
    motors.stop()
    motorsFn.unsetWorking()
  },
  setWorking: () => {
    motorsFn.working = true
  },
  unsetWorking: () => {
    setTimeout(() => {
      motorsFn.working = false
    }, MOTORS_AUTO_STOP_TIME)
  },
  isWorking: () => motorsFn.working,
}

boardsFn.boards.on('ready', () => {

  motors = new five.Motors([{
    pins: MOTORS_PINS_UNO[0].pins,
    board: boardsFn.uno,
  }, {
    pins: MOTORS_PINS_UNO[1].pins,
    board: boardsFn.uno,
  }])

  motors[0].on('start', () => {
    // console.log('start', Date.now());

    boardsFn.boards[0].wait(MOTORS_AUTO_STOP_TIME, () => motors.stop())
  })

  // motors[0].on('stop', () => console.log('stop', Date.now()));

  boardsFn.boards.repl.inject({
    motors,
    motorsFn,
  })

})

export default motorsFn
