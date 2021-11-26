import * as annyang from 'annyang'

// import Cleverbot from '@classes/cleverbot'
import socket from '@services/socket'

function SpeechRecognition(): void {
  // const cleverbot = new Cleverbot()
  // cleverbot.getResponse('How can You help me?');

  const commands = {
    // talking
    cześć: (): void => speak('Hello Damian!'),
    'jak się masz': (): void => speak('Good, thanks. And how are You?'),
    'powiedz coś': (): void => {
      socket.emit('command.playRandomSound')
    },
    // rgb
    'światło :name': (name): void => {
      socket.emit('command.changeRGBColor', {
        color: name === 'czerwone' ? 'red' : name,
      })
    },
    'wyłącz światło': (): void => {
      socket.emit('command.turnOffRGB')
    },
    // moving
    'jedź do przodu': (): void => {
      socket.emit('command.moveMotor', { command: 'goForward' })
    },
    'jedź do tyłu': (): void => {
      socket.emit('command.moveMotor', { command: 'goBack' })
    },
    'skręć w lewo': (): void => {
      socket.emit('command.moveMotor', { command: 'turnLeft' })
    },
    'skręć w prawo': (): void => {
      socket.emit('command.moveMotor', { command: 'turnRight' })
    },
  }

  function speak(text: string): void {
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
