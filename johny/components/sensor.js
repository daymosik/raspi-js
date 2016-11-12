import five from 'johnny-five';
import board from './board.js';
import io from '../../server.socket.js';

const SENSOR_PIN = 3;
const BOTTOM_SENSOR_PIN = 2;

const sensorFn = {
  sensor: undefined,
  bottomSensor: undefined
};

board.on('ready', () => {

  sensorFn.sensor = five.Proximity({
    controller: "HCSR04",
    pin: SENSOR_PIN
  });

  sensorFn.bottomSensor = five.Proximity({
    controller: "HCSR04",
    pin: BOTTOM_SENSOR_PIN
  });

  sensorFn.sensor.on('data', function() {
    io.emit('sensor.data', { cm: parseInt(this.cm) });
  });

  sensorFn.bottomSensor.on('data', function() {
    io.emit('bottomSensor.data', { cm: parseInt(this.cm) });
  });

  board.repl.inject({
    sensorFn
  });

});

export default sensorFn;
