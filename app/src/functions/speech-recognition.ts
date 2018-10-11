import * as annyang from 'annyang'
import Cleverbot from '../classes/cleverbot'
import socket from '../socket'

function SpeechRecognition() {

  const cleverbot = new Cleverbot()

  // cleverbot.getResponse('How can You help me?');

  const commands = {
    // talking
    'cześć': () => speak('Hello Damian!'),
    'jak się masz': () => speak('Good, thanks. And how are You?'),
    'powiedz coś': () => socket.emit('command.playRandomSound'),
    // rgb
    'światło :name': (name) => socket.emit('command.changeRGBColor', {
      color: name === 'czerwone' ? 'red' : name,
    }),
    'wyłącz światło': () => socket.emit('command.turnOffRGB'),
    // moving
    'jedź do przodu': () => socket.emit('command.moveMotor', { command: 'goForward' }),
    'jedź do tyłu': () => socket.emit('command.moveMotor', { command: 'goBack' }),
    'skręć w lewo': () => socket.emit('command.moveMotor', { command: 'turnLeft' }),
    'skręć w prawo': () => socket.emit('command.moveMotor', { command: 'turnRight' }),
  }

  function speak(text) {
    socket.emit('command.speak', { text })
  }

  try {
    // Add our commands to annyang
    annyang.addCommands(commands)
    annyang.setLanguage('pl')

    // Start listening.
    annyang.start()

    annyang.debug()
  } catch (e) {
    console.log('annyyang not supported')
  }
}

const speechRecognition = new SpeechRecognition()

export default speechRecognition
