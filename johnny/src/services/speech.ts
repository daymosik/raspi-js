export class Speech {
  private exec
  private voice
  private cmd

  constructor() {
    this.exec = require('child_process').exec
    this.voice = '-voice rms'
    // kal awb_time kal16 awb rms slt
    this.cmd = `fortune | flite ${this.voice}`
  }

  public speak = (text: string) => {
    this.exec(this.getCommand(text), (error, stdout, stderr) => {
      // command output is in stdout
    })
  }

  private getCommand = (text: string) => {
    return text ? `flite ${this.voice} -t "${text}"` : `fortune | flite ${this.voice}`
  }

}

const speechService = new Speech()

export default speechService
