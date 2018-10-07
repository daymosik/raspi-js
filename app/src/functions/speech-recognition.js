import annyang from 'annyang';
import socket from '../socket';
import Cleverbot from '../classes/cleverbot';

function SpeechRecognition() {

  const cleverbot = new Cleverbot();

  // cleverbot.getResponse('How can You help me?');

  const commands = {
    // talking
    'cześć': () => speak('Hello Damian!'),
    'jak się masz': () => speak('Good, thanks. And how are You?'),
    'powiedz coś': () => socket.emit('command.playRandomSound'),
    // rgb
    'światło :name': name => socket.emit('command.changeRGBColor', {
      color: name === 'czerwone' ? 'red' : name
    }),
    'wyłącz światło': () => socket.emit('command.turnOffRGB'),
    // moving
    'jedź do przodu': () => socket.emit('command.moveMotor', { command: 'goForward' }),
    'jedź do tyłu': () => socket.emit('command.moveMotor', { command: 'goBack' }),
    'skręć w lewo': () => socket.emit('command.moveMotor', { command: 'turnLeft' }),
    'skręć w prawo': () => socket.emit('command.moveMotor', { command: 'turnRight' }),
  };

  function speak(text) {
    socket.emit('command.speak', { text });
  }

  // Add our commands to annyang
  annyang.addCommands(commands);
  annyang.setLanguage('pl');

  // Start listening.
  annyang.start();

  annyang.debug();

}

export default SpeechRecognition;
