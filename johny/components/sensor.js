import five from 'johnny-five';
import board from './board.js';
import io from '../../server.socket.js';

const SENSOR_PIN = 3;

let sensor;

board.on('ready', () => {

  sensor = five.Proximity({
    controller: "HCSR04",
    pin: SENSOR_PIN
  });

  sensor.on('data', function() {
    const cm = parseInt(this.cm);

    io.emit('sensor.data', { cm });
  });

  // allows direct command line access
  board.repl.inject({
    sensor
  });

});

export default sensor;
