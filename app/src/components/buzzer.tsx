import * as React from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup } from 'reactstrap'

import socket from '@services/socket'

export interface BuzzerState {
  text: string
}

const buzzerSongs = [
  'beethovens-fifth',
  'claxon',
  'do-re-mi',
  'doorbell',
  'funeral-march-short',
  'jingle-bells',
  'jingle-bells-short',
  'mario-fanfare',
  'mario-intro',
  'never-gonna-give-you-up',
  'nyan-intro',
  'nyan-melody',
  'pew-pew-pew',
  'starwars-theme',
  'tetris-theme',
  'wedding-march',
]

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
                  <Dropdown>
                    <DropdownToggle caret>Buzzer Songs</DropdownToggle>
                    <DropdownMenu>
                      {buzzerSongs.map((song) => (
                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        <DropdownItem onClick={() => this.speakDropdown(song)} key={song}>
                          {song}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
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

  public speakDropdown = (song?: string): void => {
    socket.emit('command.playBuzzer', { text: song })
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
