import five from 'johnny-five';
import board from './board.js';

const SERVO_PIN = 11;

let servo;

const servoFn = {
  lookLeft: () => servo.to(160),
  lookRight: () => servo.to(20),
  lookStraight: () => servo.center()
};

board.on('ready', () => {

  // Servo
  servo = new five.Servo({
    pin: SERVO_PIN,
    center: true,
    range: [0, 180]
  });

  // servo.sweep({
  //   interval: 1200,
  //   range: [40, 140],
  //   step: 40
  // });

  board.repl.inject({
    servo,
    servoFn,
  });

});

export default servoFn;