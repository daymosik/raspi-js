import * as translate from 'google-translate-api'

function Translate() {

  this.getTranslation = (text) => {
    translate(text, { from: 'pl', to: 'en' }).then((res) => {
      console.log(res.text)
      // => I speak English
      console.log(res.from.language.iso)
      // => nl
    }).catch((err) => {
      console.error(err)
    })
  }

}

export default Translate
