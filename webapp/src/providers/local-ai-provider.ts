const PROVIDER_URL = 'https://daymosik.freemyip.com:5000/ollama'

class LocalAIProvider {
  public ask = async (question: string): Promise<string> => {
    const response = await fetch(PROVIDER_URL + '/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
        stream: false,
      }),
    })

    const rawBody = await response.text()

    let data: {
      message?: { role?: string; content?: string }
      response?: string
      detail?: string
      error?: string
    } = {}

    try {
      data = rawBody ? JSON.parse(rawBody) : {}
    } catch {
      // non-json response
    }

    if (!response.ok) {
      throw new Error(data.detail || data.error || rawBody || `Local AI request failed: ${response.status}`)
    }

    // Ollama /api/chat returns: { message: { content: "..." } }
    if (data.message?.content) {
      return data.message.content.trim()
    }

    // Ollama /api/generate returns: { response: "..." }
    if (typeof data.response === 'string') {
      return data.response.trim()
    }

    throw new Error(data.detail || data.error || 'Local AI returned unexpected response format')
  }
}

const localAIProvider = new LocalAIProvider()

export default localAIProvider
