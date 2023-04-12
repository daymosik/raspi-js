import * as React from 'react'

import socket from '@services/socket'

export interface SpeechState {
  text: string
}

export default class Speech extends React.Component<unknown, SpeechState> {
  constructor(props: unknown) {
    super(props)

    this.state = { text: '' }
  }

  public render(): JSX.Element {
    return (
      <form action="" className="" onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <input
            name="text"
            type="text"
            className="form-control"
            value={this.state.text}
            onChange={this.handleChange}
          />
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-secondary">Speak!</button>
          <button className="btn btn-primary" onClick={this.speak} type="button">
            Speak fortune!
          </button>
        </div>
      </form>
    )
  }

  public speak = (): void => {
    socket.emit('command.speak', { text: this.state.text })
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ text: event.target.value })
  }

  public handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    this.speak()
  }
}
