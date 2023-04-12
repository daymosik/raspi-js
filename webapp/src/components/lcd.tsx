import * as React from 'react'
import socket from '@services/socket'

export interface LCDViewState {
  text: string
}

export default class LCDView extends React.Component<unknown, LCDViewState> {
  constructor(props: unknown) {
    super(props)

    this.state = {
      text: '',
    }
  }

  public render(): JSX.Element {
    return (
      <form onSubmit={this.setText}>
        <div className="d-grid gap-2">
          <input className="form-control" value={this.state.text} onChange={this.handleText} />
          <button className="btn btn-primary">Set text</button>
          <button className="btn btn-secondary" type="button" onClick={this.cleanText}>
            Clean text
          </button>
        </div>
      </form>
    )
  }

  public handleText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ text: event.target.value })
  }
  public setText = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    // TODO
    // printLCDAutoscroll
    socket.emit('command.printLCD', {
      text: this.state.text,
    })
  }

  public cleanText = (): void => {
    this.setState({ text: '' })

    socket.emit('command.cleanLCD')
  }
}
