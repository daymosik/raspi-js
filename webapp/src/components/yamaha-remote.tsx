import * as React from 'react'

import socket from '@services/socket'

export default class YamahaRemote extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
    const styles = {
      btn: {
        height: '100px',
        // fontSize: '30px',
        flexBasis: '32%',
        flexGrow: 1,
      },
      iconMirror: {
        transform: 'matrix(-1, 0, 0, 1, 0, 0)',
      },
    }

    return (
      <div className="d-flex flex-wrap gap-1">
        <button onClick={this.turnOnTv} style={styles.btn} className="btn btn-secondary btn-lg">
          <i className="fa fa-share-alt" /> TV
        </button>
        <button onClick={this.turnOnAppleTv} style={styles.btn} className="btn btn-secondary btn-lg">
          <i className="fa fa-share-alt" /> Apple TV
        </button>
        <button onClick={this.turnOnPlaystation} style={styles.btn} className="btn btn-secondary btn-lg">
          <i className="fa fa-share-alt" /> Playstation
        </button>
        <button onClick={this.volumeUp} style={styles.btn} className="btn btn-secondary btn-lg">
          <i className="fa-solid fa-volume-high" /> Volume UP
        </button>
        <button onClick={this.muteOn} style={styles.btn} className="btn btn-secondary btn-lg">
          <i className="fa-solid fa-volume-off" /> Mute
        </button>
        <button onClick={this.volumeDown} style={styles.btn} className="btn btn-secondary btn-lg">
          <i className="fa-solid fa-volume-low" /> Volume DOWN
        </button>
        <button onClick={this.turnOn} style={styles.btn} className="btn btn-secondary btn-lg">
          <i className="fa fa-share-alt" /> Turn ON
        </button>
        <button onClick={this.turnOff} style={styles.btn} className="btn btn-secondary btn-lg">
          <i className="fa fa-share-alt" /> Turn OFF
        </button>
      </div>
    )
  }

  public muteOff = (): void => {
    socket.emit('command.yamaha.muteOff')
  }

  public muteOn = (): void => {
    socket.emit('command.yamaha.muteOn')
  }

  public turnOff = (): void => {
    socket.emit('command.yamaha.turnOff')
  }

  public turnOn = (): void => {
    socket.emit('command.yamaha.turnOn')
  }

  public turnOnTv = (): void => {
    socket.emit('command.yamaha.turnOnTv')
  }

  public turnOnAppleTv = (): void => {
    socket.emit('command.yamaha.turnOnAppleTv')
  }

  public turnOnPlaystation = (): void => {
    socket.emit('command.yamaha.turnOnPlaystation')
  }

  public volumeDown = (): void => {
    socket.emit('command.yamaha.volumeDown')
  }

  public volumeUp = (): void => {
    socket.emit('command.yamaha.volumeUp')
  }
}
