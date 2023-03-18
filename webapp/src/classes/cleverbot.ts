import jsonp from 'jsonp'

const CLEVERBOT_KEY = '60854c7dfb3e58867809a4ccc4c61cd0'
const CLEVERBOT_URL = 'https://www.cleverbot.com/getreply'

export default class Cleverbot {
  public getResponse(message: string): void {
    const input = encodeURIComponent(message)
    jsonp(`${CLEVERBOT_URL}?key=${CLEVERBOT_KEY}&input=${input}`, {}, (err, data) => {
      console.log(data)
    })
  }
}
