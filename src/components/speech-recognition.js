import annyang from 'annyang';
import socket from '../socket';

const commands = {
  'cześć': () => speak('Hello Damian!'),
  'jak się masz': () => speak('Good, thanks'),
  'światło :name': name => socket.emit('command.changeRGBColor', {
    color: name === 'czerwone' ? 'red' : 'white'
  }),
  'powiedz coś': () => socket.emit('command.playRandomSound')
};

function speak(text) {
  socket.emit('command.speak', {
    text
  });
}

// Add our commands to annyang
annyang.addCommands(commands);
annyang.setLanguage('pl');

// Start listening.
annyang.start();

annyang.debug();

export default annyang;
