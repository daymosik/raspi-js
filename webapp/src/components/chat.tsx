import * as React from 'react'
import localAIProvider from '../providers/local-ai-provider'

export interface ChatViewState {
  question: string
  conversation: string
}

export default class ChatView extends React.Component<unknown, ChatViewState> {
  constructor(props: unknown) {
    super(props)

    this.state = {
      question: '',
      conversation: '',
    }
  }

  public render(): JSX.Element {
    return (
      <form onSubmit={this.askQuestion}>
        <div className="d-grid gap-2">
          <textarea
            className="form-control"
            readOnly={true}
            style={{ resize: 'none' }}
            rows={8}
            value={this.state.conversation}
          />

          <input className="form-control" value={this.state.question} onChange={this.handleQuestion} />
          <button className="btn btn-primary">Send</button>
        </div>
      </form>
    )
  }

  public handleQuestion = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ question: event.target.value })
  }

  public askQuestion = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    if (!this.state.question) {
      return
    }

    const question = this.state.question

    const now = (): string => {
      const d = new Date()
      return '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ']'
    }

    this.setState({
      conversation: now() + ' Me: ' + question + '\n' + this.state.conversation,
      question: '',
    })

    try {
      const answer = await localAIProvider.ask(question)
      this.setState({ conversation: now() + ' Chat: ' + answer + '\n' + this.state.conversation })
    } catch {
      this.setState({ conversation: now() + ' Chat: Error while contacting Local AI.\n' + this.state.conversation })
    }
  }
}
