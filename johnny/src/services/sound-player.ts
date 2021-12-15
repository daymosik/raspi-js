import * as fs from 'fs'
import Player from 'play-sound'

const MAIN_FOLDER = '../data/wav/'

type Play = ReturnType<typeof Player>

export class SoundPlayer {
  private player: Play
  private sounds

  constructor() {
    this.player = Player()
    this.sounds = []

    fs.readdir(
      MAIN_FOLDER,
      (err, folders) =>
        folders &&
        folders.forEach((folder) => {
          fs.readdir(`${MAIN_FOLDER}${folder}/`, (e, files) => {
            this.sounds = [...this.sounds, ...files.map((file) => `${MAIN_FOLDER}${folder}/${file}`)]
          })
        }),
    )
  }

  public playRandomSound = (): void => {
    try {
      const sound = this.sounds[Math.floor(Math.random() * this.sounds.length)]
      console.info(`Playing: ${sound}`)
      this.player.play(sound, (err) => {
        if (err) {
          throw err
        }
      })
    } catch (e) {
      console.log('player-error', e)
    }
  }
}

const soundPlayer = new SoundPlayer()

export default soundPlayer
