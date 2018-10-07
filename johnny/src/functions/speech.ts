function Speech() {

  const exec = require('child_process').exec
  const voice = '-voice rms'
  // kal awb_time kal16 awb rms slt
  const cmd = `fortune | flite ${voice}`

  this.speak = (text) => {
    exec(getCommand(text), (error, stdout, stderr) => {
      // command output is in stdout
    })
  }

  function getCommand(text) {
    return text ? `flite ${voice} -t "${text}"` : `fortune | flite ${voice}`
  }

}

export default Speech
