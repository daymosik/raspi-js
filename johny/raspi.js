import io from '../server.socket.js';
import boardsFn from './components/board.js';
import motorsFn from './components/motors.js';
// import servoFn from './components/servo.js';
import sensorFn from './components/sensor.js';
import ledRGBFn from './components/led-rgb.js';
import buzzerFn from './components/buzzer.js';
import sevenLedFn from './components/seven-segment-led.js';

// import Exploration from './functions/exploration.js';
import ExplorationNoServo from './functions/exploration-no-servo.js';
import Speech from './functions/speech.js';

let exploration, exploration2, speech;

boardsFn.boards.on('ready', function() {

  speech = new Speech();

  // exploration = new Exploration();

  // io.on('connection', client => {
  //   client.on('command.toggleExploration', () => exploration.toggleExploration());
  // });

  // ledRGBFn.ledRGB.color('blue');

  // exploration.startExploring();

  // exploration2 = new ExplorationNoServo();
  // exploration2.startExploring();

  // allows direct command line access
  boardsFn.boards.repl.inject({
    exploration,
    speech
  });

});

export default exploration;
