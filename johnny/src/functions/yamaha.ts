import * as YamahaAPI from 'yamaha-nodejs'

const receiver = new YamahaAPI('192.168.1.140')

export type YamahaInput = 'HDMI1' | 'HDMI2' | 'HDMI3'

export type YamahaActions = keyof Yamaha

export class Yamaha {
  public turnOn = async () => {
    await receiver.powerOn()
  }

  public turnOff = async () => {
    await receiver.powerOff()
  }

  public volumeDown = async () => {
    await receiver.volumeDown(10)
  }

  public volumeUp = async () => {
    await receiver.volumeUp(10)
  }

  public setVolumeTo = async (volume: number) => {
    await receiver.setVolumeTo(volume)
  }

  public turnOnTv = async () => {
    await this.setVolumeTo(-200)
    await receiver.setMainInputTo('HDMI2')
  }

  public turnOnAppleTv = async () => {
    await this.setVolumeTo(-350)
    await receiver.setMainInputTo('HDMI3')
  }

  public turnOnPlaystation = async () => {
    await this.setVolumeTo(-350)
    await receiver.setMainInputTo('HDMI1')
  }
}

const yamaha = new Yamaha()

export default yamaha
