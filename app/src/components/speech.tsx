import socket from '@services/socket'
import * as React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'

export interface SpeechState {
  text: string
}

export default class Speech extends React.Component<unknown, SpeechState> {
  constructor(props) {
    super(props)

    this.state = { text: '' }
  }

  public render() {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <Form action="" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input type="text" name="text" value={this.state.text} onChange={this.handleChange} />
                </FormGroup>
                <Button>Speak!</Button>
              </Form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button color="primary" onClick={this.speak}>
                Speak fortune!
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public speak = () => socket.emit('command.speak', { text: this.state.text })

  public handleChange = (event) => {
    this.setState({ text: event.target.value })
  }

  public handleSubmit = (event) => {
    event.preventDefault()
    this.speak()
  }
}
