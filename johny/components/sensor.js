import five from 'johnny-five';
import boardsFn from './board.js';
import io from '../../server.socket.js';

const SENSORS = {
  left: {
    pin: 3
  },
  right: {
    pin: 2
  }
};

const SENSOR_PIN = 3;
const BOTTOM_SENSOR_PIN = 2;

const sensorFn = {
  leftSensor: undefined,
  rightSensor: undefined
};

boardsFn.boards.on('ready', function() {

  sensorFn.leftSensor = five.Proximity({
    controller: "HCSR04",
    pin: SENSORS.left.pin,
    board: boardsFn.uno
  });

  sensorFn.rightSensor = five.Proximity({
    controller: "HCSR04",
    pin: SENSORS.right.pin,
    board: boardsFn.uno
  });

  sensorFn.leftSensor.on('data', function() {
    io.emit('leftSensor.data', { cm: parseInt(this.cm) });
  });

  sensorFn.rightSensor.on('data', function() {
    io.emit('rightSensor.data', { cm: parseInt(this.cm) });
  });

  boardsFn.boards.repl.inject({
    sensorFn
  });

});

export default sensorFn;
