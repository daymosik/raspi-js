import five from 'johnny-five';
import board from './board.js';
import io from '../../server.socket.js';

const SENSOR_PIN = 3;

let sensor;

board.on('ready', () => {

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
    // }

    const cm = parseInt(this.cm);

    io.emit('sensor.data', {
      cm
    });
  });

  // Inject the `motor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    sensor
  });

});

export default sensor;