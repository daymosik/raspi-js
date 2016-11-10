import five from 'johnny-five';
import board from './board.js';
import io from '../../server.socket.js';

const MOTORS_PINS = [{
  pins: {
    pwm: 5,
    dir: 7,
    cdir: 8
  }
}, {
  pins: {
    pwm: 6,
    dir: 10,
    cdir: 9
  }
}];
const MOTORS_AUTO_STOP_TIME = 500;
const MOTORS_SPEED = 180;
const MOTORS_TURN_SPEED = 180;

let motors;

const motorsFn = {
  autoStopTime: MOTORS_AUTO_STOP_TIME,
  working: false,
  turnLeft: speed => {
    motorsFn.setWorking();
    motors[0].forward(speed || MOTORS_TURN_SPEED);
    motors[1].reverse(speed || MOTORS_TURN_SPEED);
    motorsFn.unsetWorking();
  },
  turnRight: speed => {
    motorsFn.setWorking();
    motors[1].forward(speed || MOTORS_TURN_SPEED);
    motors[0].reverse(speed || MOTORS_TURN_SPEED);
    motorsFn.unsetWorking();
  },
  goForward: speed => {
    motorsFn.setWorking();
    motors.forward(speed || MOTORS_SPEED);
    motorsFn.unsetWorking();
  },
  goBack: speed => {
    motorsFn.setWorking();
    motors.reverse(speed || MOTORS_SPEED);
    motorsFn.unsetWorking();
  },
  stop: () => {
    motors.stop()
    motorsFn.unsetWorking();
  },
  setWorking: () => {
    motorsFn.working = true;
  },
  unsetWorking: () => {
    setTimeout(() => {
      motorsFn.working = false;
    }, MOTORS_AUTO_STOP_TIME);
  },
  isWorking: () => motorsFn.working
};

board.on('ready', () => {

  motors = new five.Motors(MOTORS_PINS);

  motors[0].on('start', () => {
    // console.log('start', Date.now());

    board.wait(MOTORS_AUTO_STOP_TIME, () => motors.stop());
  });

  // motors[0].on('stop', () => console.log('stop', Date.now()));

  board.repl.inject({
    motors,
    motorsFn
  });

});

export default motorsFn;