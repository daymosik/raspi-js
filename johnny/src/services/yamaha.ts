import * as YamahaAPI from 'yamaha-nodejs'

export type YamahaInput = 'HDMI1' | 'HDMI2' | 'HDMI3'

export type YamahaActions = keyof Yamaha

export class Yamaha {
  private receiver

  constructor() {
    this.receiver = new YamahaAPI('192.168.1.140')
  }

  public turnOn = async () => {
    await this.receiver.powerOn()
  }

  public turnOff = async () => {
    await this.receiver.powerOff()
  }

  public volumeDown = async () => {
    await this.receiver.volumeDown(10)
  }

  public volumeUp = async () => {
    await this.receiver.volumeUp(10)
  }

  public setVolumeTo = async (volume: number) => {
    await this.receiver.setVolumeTo(volume)
  }

  public turnOnTv = async () => {
    await this.setVolumeTo(-200)
    await this.receiver.setMainInputTo('HDMI2')
  }

  public turnOnAppleTv = async () => {
    await this.setVolumeTo(-350)
    await this.receiver.setMainInputTo('HDMI3')
  }

  public turnOnPlaystation = async () => {
    await this.setVolumeTo(-350)
    await this.receiver.setMainInputTo('HDMI1')
  }

  public muteOff = async () => {
    await this.receiver.muteOff()
  }

  public muteOn = async () => {
    await this.receiver.muteOn()
  }
}

const yamaha = new Yamaha()

export default yamaha
