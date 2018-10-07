import * as fs from 'fs'
import * as player from 'play-sound'
import * as R from 'ramda'

const MAIN_FOLDER = '../data/wav/'

function Player() {

  this.Player = new player()
  this.sounds = []

  fs.readdir(MAIN_FOLDER, (err, folders) => folders && R.forEach((folder) => {
    fs.readdir(`${MAIN_FOLDER}${folder}/`, (e, files) => {
      this.sounds = R.concat(this.sounds, R.map((file) => `${MAIN_FOLDER}${folder}/${file}`, files))
    })
  }, folders))

  this.playRandomSound = () => {
    const sound = this.sounds[Math.floor(Math.random() * this.sounds.length)]
    console.info(`Playing: ${sound}`)
    return this.Player.play(sound, (err) => {
      if (err) {
        throw err
      }
    })
  }
}

export default Player
