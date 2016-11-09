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

const MOTORS_SPEED = 180;
const MOTORS_TURN_SPEED = 180;

let motors;

const motorsFn = {
  turnLeft: speed => {
    motors[0].forward(speed || MOTORS_TURN_SPEED);
    motors[1].reverse(speed || MOTORS_TURN_SPEED);
  },
  turnRight: speed => {
    motors[1].forward(speed || MOTORS_TURN_SPEED);
    motors[0].reverse(speed || MOTORS_TURN_SPEED);
  },
  goForward: speed => motors.forward(speed || MOTORS_SPEED),
  goBack: speed => motors.reverse(speed || MOTORS_SPEED),
  stop: () => motors.stop()
};

board.on('ready', () => {

  motors = new five.Motors(MOTORS_PINS);

  motors[0].on('start', () => {
    console.log('start', Date.now());

    board.wait(500, () => motors.stop());
  });

  motors[0].on('stop', () => console.log('stop', Date.now()));

  // allows direct command line access
  board.repl.inject({
    motors,
    motorsFn
  });

});

export default motorsFn;