import { Configuration, OpenAIApi } from 'openai'

class OpenAIClass {
  public configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  public openai = new OpenAIApi(this.configuration)

  public ask = async (question: string): Promise<string> => {
    const response = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: question,
      // max_tokens: 200,
    })
    return response.data.choices[0].text?.replace('\n/g', '') || ''
  }
}

const openAI = new OpenAIClass()

export default openAI
