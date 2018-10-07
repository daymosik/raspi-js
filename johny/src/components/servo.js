import five from 'johnny-five';
import boardsFn from './board.js';

const SERVO_PIN = 11;

let servo;

const servoFn = {
  lookLeft: () => servo.to(160),
  lookRight: () => servo.to(20),
  lookStraight: () => servo.center()
};

boardsFn.boards.on('ready', () => {

  servo = new five.Servo({
    pin: SERVO_PIN,
    center: true,
    range: [0, 180]
  });

  boardsFn.boards.repl.inject({
    servo,
    servoFn,
  });

});

export default servoFn;