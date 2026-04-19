const PROVIDER_URL = 'http://192.168.1.100:11434/api/chat'

class LocalAIProvider {
  public ask = async (question: string): Promise<string> => {
    const response = await fetch(PROVIDER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        messages: question,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`Local AI request failed: ${response.status}`)
    }

    const data = (await response.json()) as { response?: string; detail?: string; error?: string }

    if (typeof data.response === 'string') {
      return data.response.trim()
    }

    throw new Error(data.detail || data.error || 'Local AI returned an unexpected response format')
  }
}

const localAIProvider = new LocalAIProvider()

export default localAIProvider
