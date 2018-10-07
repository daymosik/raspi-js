import boardsFn from './components/board'
// import buzzerFn from './components/buzzer'
// import ledRGBFn from './components/led-rgb'
// import motorsFn from './components/motors'
// import servoFn from './components/servo';
// import sensorFn from './components/sensor'
// import sevenLedFn from './components/seven-segment-led'
// import Exploration from './functions/exploration';
// import ExplorationNoServo from './functions/exploration-no-servo'
import Player from './functions/play'
import Speech from './functions/speech'
import Translate from './functions/translate'

let speech
let player
let translate

boardsFn.boards.on('ready', () => {

  speech = new Speech()
  player = new Player()

  translate = new Translate()
  translate.getTranslation('Jak się masz?')

  setTimeout(() => {
    player.playRandomSound()
  }, 10000)

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
    speech,
    player,
  })

})
