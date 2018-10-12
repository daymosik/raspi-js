import * as translate from 'google-translate-api'

export class Translate {
  private translate

  constructor() {
    this.translate = translate
  }

  public getTranslation = (text) => {
    this.translate(text, { from: 'pl', to: 'en' })
      .then((res) => {
        console.log(res.text)
        // => I speak English
        console.log(res.from.language.iso)
        // => nl
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

const translateService = new Translate()

export default translateService
