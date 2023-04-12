// import Cleverbot from '@classes/cleverbot'
import socket from '@services/socket'
import annyang, { Annyang } from 'annyang'

export class SpeechRecognition {
  public annyang: Annyang = annyang as Annyang

  // const cleverbot = new Cleverbot()
  // cleverbot.getResponse('How can You help me?');

  public commands = {
    // talking
    cześć: (): void => this.speak('Hello Damian!'),
    'jak się masz': (): void => this.speak('Good, thanks. And how are You?'),
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

  public speak = (text: string): void => {
    socket.emit('command.speak', { text })
  }

  public init = (): void => {
    try {
      // TODO
      this.annyang.addCommands(this.commands as any)
      this.annyang.setLanguage('pl')
    } catch (e) {
      console.log('annyang not supported')
    }
  }

  public start = (): void => {
    try {
      if (!this.annyang.isListening()) {
        this.annyang.start()
        this.annyang.debug()
      }
    } catch (e) {
      console.log('annyyang not supported')
    }
  }

  public stop = (): void => {
    this.annyang.abort()
  }
}

const speechRecognition = new SpeechRecognition()

export default speechRecognition
