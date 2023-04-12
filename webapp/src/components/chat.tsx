import * as React from 'react'
import openAI from '@classes/openai'

export interface ChatViewState {
  question: string
  conversation: string
}

export default class ChatView extends React.Component<unknown, ChatViewState> {
  constructor(props) {
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

    const now = (): string => {
      const d = new Date()
      return '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ']'
    }

    await this.setState({
      conversation: now() + ' Me: ' + this.state.question + '\n' + this.state.conversation,
      question: '',
    })

    const answer = await openAI.ask(this.state.question)

    this.setState({ conversation: now() + ' Chat: ' + answer + '\n' + this.state.conversation })
  }
}
