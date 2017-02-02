import annyang from 'annyang';
import socket from '../socket';
import jsonp from 'jsonp';
import R from 'ramda';

const CLEVERBOT_KEY = '60854c7dfb3e58867809a4ccc4c61cd0';
const CLEVERBOT_URL = 'https://www.cleverbot.com/getreply';

class Cleverbot {

  constructor() {

  }

  getResponse(message) {
    const input = encodeURIComponent(message);
    jsonp(`${CLEVERBOT_URL}?key=${CLEVERBOT_KEY}&input=${input}`, {}, (err, data) => {

      console.log(data);

    });
  }
}

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
