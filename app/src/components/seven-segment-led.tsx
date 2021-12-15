import * as React from 'react'

import socket from '@services/socket'

// TODO: visual segment led with current number

export default class SevenSegmentLedView extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
    return (
      <div className="row">
        <div className="col">
          Seven segment led
          <button className="btn btn-primary" onClick={this.start}>
            Start counting
          </button>
          <button className="btn btn-secondary" onClick={this.stop}>
            Stop counting
          </button>
        </div>
      </div>
    )
  }

  public start = (): void => {
    socket.emit('command.startSevenSegmentLed')
  }

  public stop = (): void => {
    socket.emit('command.stopSevenSegmentLed')
  }
}
