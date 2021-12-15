import * as fs from 'fs'
import * as Player from 'play-sound'

const MAIN_FOLDER = '../data/wav/'

export class SoundPlayer {
  private Player
  private sounds

  constructor() {
    this.Player = new Player()
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

  // TODO: try catch
  public playRandomSound = (): void => {
    const sound = this.sounds[Math.floor(Math.random() * this.sounds.length)]
    console.info(`Playing: ${sound}`)
    return this.Player.play(sound, (err) => {
      if (err) {
        throw err
      }
    })
  }
}

const soundPlayer = new SoundPlayer()

export default soundPlayer
