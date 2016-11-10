import five from 'johnny-five';
import board from './board.js';
import io from '../../server.socket.js';

const SENSOR_PIN = 3;

const sensorFn = {
  sensor: undefined
};

board.on('ready', () => {

  sensorFn.sensor = five.Proximity({
    controller: "HCSR04",
    pin: SENSOR_PIN
  });

  sensorFn.sensor.on('data', function() {
    const cm = parseInt(this.cm);

    io.emit('sensor.data', { cm });
  });

  board.repl.inject({
    sensorFn
  });

});

export default sensorFn;
