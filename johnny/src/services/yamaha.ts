import * as YamahaAPI from 'yamaha-nodejs'

export type YamahaInput = 'HDMI1' | 'HDMI2' | 'HDMI3'

export type YamahaActions = keyof Yamaha

export class Yamaha {
  private receiver

  constructor() {
    this.receiver = new YamahaAPI('192.168.1.140')
  }

  public turnOn = async (): Promise<void> => {
    await this.receiver.powerOn()
  }

  public turnOff = async (): Promise<void> => {
    await this.receiver.powerOff()
  }

  public volumeDown = async (): Promise<void> => {
    await this.receiver.volumeDown(10)
  }

  public volumeUp = async (): Promise<void> => {
    await this.receiver.volumeUp(10)
  }

  public setVolumeTo = async (volume: number): Promise<void> => {
    await this.receiver.setVolumeTo(volume)
  }

  public turnOnTv = async (): Promise<void> => {
    await this.setVolumeTo(-200)
    await this.receiver.setMainInputTo('HDMI2')
  }

  public turnOnAppleTv = async (): Promise<void> => {
    await this.setVolumeTo(-350)
    await this.receiver.setMainInputTo('HDMI3')
  }

  public turnOnPlaystation = async (): Promise<void> => {
    await this.setVolumeTo(-350)
    await this.receiver.setMainInputTo('HDMI1')
  }

  public muteOff = async (): Promise<void> => {
    await this.receiver.muteOff()
  }

  public muteOn = async (): Promise<void> => {
    await this.receiver.muteOn()
  }

  public isOn = async (): Promise<boolean> => {
    const basicInfo = await this.receiver.getBasicInfo()
    return basicInfo.isOn()
  }
}

const yamaha = new Yamaha()

export default yamaha
