import socket from '@services/socket'
import * as React from 'react'

export default class SevenSegmentLedView extends React.Component {
  public render() {
    return (
      <div className="row">
        <div className="col">
          Seven segment led
          <button onClick={this.start}>Start</button>
          <button onClick={this.stop}>Stop</button>
        </div>
      </div>
    )
  }

  public start = (): void => socket.emit('command.startSevenSegmentLed')

  public stop = (): void => socket.emit('command.stopSevenSegmentLed')
}
