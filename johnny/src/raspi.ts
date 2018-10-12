import boardsFn from '@components/board'
import soundPlayer from '@services/sound-player'
import speechService from '@services/speech'
import translateService from '@services/translate'

boardsFn.boards.on('ready', () => {
  const init = () => {
    translateService.getTranslation('Jak się masz?')
    setTimeout(() => soundPlayer.playRandomSound(), 10000)
  }

  init()

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
