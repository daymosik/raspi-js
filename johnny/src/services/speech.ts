export class Speech {
  private exec
  private voice
  private cmd

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.exec = require('child_process').exec
    this.voice = '-voice rms'
    // kal awb_time kal16 awb rms slt
    // this.cmd = `fortune | flite ${this.voice}`
    this.cmd = `fortune | festival --tts`
  }

  public speak = (text: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.exec(this.getCommand(text), (error, stdout, stderr) => {
      // command output is in stdout
    })
  }

  private getCommand = (text: string): string => {
    return text ? `"${text}" | festival --tts` : `fortune | festival --tts`
    // return text ? `flite ${this.voice} -t "${text}"` : `fortune | flite ${this.voice}`
  }
}

const speechService = new Speech()

export default speechService
