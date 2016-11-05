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
const SERVO_PIN = 11;
const SENSOR_PIN = 3;

const MOTORS_TURN_SPEED = 180;

const five = require('johnny-five');
const board = new five.Board();

let motors, servo, sensor;

let onRoad = false;

board.on('ready', () => {

  // Motors
  motors = new five.Motors(MOTORS_PINS);

  const turnLeft = () => {
    motors[0].forward(MOTORS_TURN_SPEED);
    motors[1].reverse(MOTORS_TURN_SPEED);
  };

  const turnRight = () => {
    motors[1].forward(MOTORS_TURN_SPEED);
    motors[0].reverse(MOTORS_TURN_SPEED);
  };

  const motorsFn = {
    turnLeft,
    turnRight
  };

  motors[0].on('start', () => {
    // onRoad = true;
    console.log('start', Date.now());

    // board.wait(1000, () => motors.stop());
  });

  motors[0].on('stop', () => {
    // onRoad = false;
    console.log('stop', Date.now());
  });

  // motors.start(150);

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

  // Sensor
  sensor = five.Proximity({
    controller: "HCSR04",
    pin: SENSOR_PIN
  });

  sensor.on('data', function() {
    // if (onRoad && this.cm < 20) {
    //   console.log('stop');
    //   servo.stop();
    //   motors.stop();
    //   lookForNextDirection();
    // }
  });

  // sensor.on("change", function() {
  //   console.log("The obstruction has moved.");
  // });

  function lookForNextDirection() {

  }

  // Inject the `motor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    motors,
    motorsFn,
    servo,
    sensor
  });

});