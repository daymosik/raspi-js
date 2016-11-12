import io from '../server.socket.js';
import board from './components/board.js';
import motorsFn from './components/motors.js';
import servoFn from './components/servo.js';
import sensorFn from './components/sensor.js';
import Exploration from './functions/exploration.js';
// import ledRGBFn from './components/led-rgb.js';

let exploration;

board.on('ready', () => {

  exploration = new Exploration();

  io.on('connection', client => {
    client.on('command.toggleExploration', () => exploration.toggleExploration());
  });

  // ledRGBFn.ledRGB.color('#72a33f');

  // exploration.startExploring();

  // allows direct command line access
  board.repl.inject({
    exploration
  });

});

export default exploration;
