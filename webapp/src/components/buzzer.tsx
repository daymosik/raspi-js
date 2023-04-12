import * as React from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

import socket from '@services/socket'

export interface BuzzerState {
  text: string
  dropdownOpen: boolean
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

    this.state = { text: '', dropdownOpen: false }
  }

  public render(): JSX.Element {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <form action="" className="" onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
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
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-secondary">Play buzzer !</button>
                  <button className="btn btn-primary" onClick={this.speak} type="button">
                    Play buzzer !
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public toggleDropdown = (): void => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
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
