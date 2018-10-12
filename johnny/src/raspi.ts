import boardsFn from '@components/board'
import { SevenSegmentLed } from '@components/seven-segment-led'
import soundPlayer from '@services/sound-player'
import speechService from '@services/speech'
import translateService from '@services/translate'

export interface RaspiComponents {
  sevenSegmentLed: SevenSegmentLed | undefined
}

const raspiComponents: RaspiComponents = {
  sevenSegmentLed: undefined,
}

boardsFn.boards.on('ready', () => {
  const init = () => {
    translateService.getTranslation('Jak się masz?')
    setTimeout(() => soundPlayer.playRandomSound(), 10000)
  }

  init()

  raspiComponents.sevenSegmentLed = new SevenSegmentLed(boardsFn)

  // exploration = new Exploration();
  // exploration.startExploring();

  // exploration2 = new ExplorationNoServo();
  // exploration2.startExploring();

  // allows direct command line access
  boardsFn.boards.repl.inject({
    speech: speechService,
    player: soundPlayer,
  })
})

export default raspiComponents
