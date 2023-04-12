import * as React from 'react'

import socket from '@services/socket'

export default class Player extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
    return (
      <button className="btn btn-primary" onClick={this.playRandomSound}>
        Play random!
      </button>
    )
  }

  public playRandomSound = (): void => {
    socket.emit('command.playRandomSound')
  }
}
