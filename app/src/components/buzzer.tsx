import * as React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'

import socket from '@services/socket'

export interface BuzzerState {
  text: string
}

export default class Buzzer extends React.Component<unknown, BuzzerState> {
  constructor(props: unknown) {
    super(props)

    this.state = { text: '' }
  }

  public render(): JSX.Element {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <Form action="" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input type="text" name="text" value={this.state.text} onChange={this.handleChange} />
                </FormGroup>
                <Button>Play buzzer !</Button>
              </Form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button color="primary" onClick={this.speak}>
                Play buzzer !
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public speak = (): void => {
    socket.emit('command.playBuzzer', { text: this.state.text })
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ text: event.target.value })
  }

  public handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    this.speak()
  }
}
