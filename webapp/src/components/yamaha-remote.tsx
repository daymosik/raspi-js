import * as React from 'react'

import socket from '@services/socket'

export default class YamahaRemote extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
    const styles = {
      row: {
        marginBottom: '20px',
      },
      btn: {
        height: '100px',
        fontSize: '30px',
      },
      iconMirror: {
        transform: 'matrix(-1, 0, 0, 1, 0, 0)',
      },
    }

    return (
      <div className="row">
        <div className="col text-center">
          <h2>Yamaha remote</h2>

          <div className="row">
            <button onClick={this.turnOnTv} style={styles.btn} className="btn btn-info col">
              <i className="fa fa-share-alt" /> TV
            </button>

            <button onClick={this.turnOnAppleTv} style={styles.btn} className="btn btn-info col">
              <i className="fa fa-share-alt" /> Apple TV
            </button>

            <button onClick={this.turnOnPlaystation} style={styles.btn} className="btn btn-info col">
              <i className="fa fa-share-alt" /> Playstation
            </button>
          </div>

          <div className="row">
            <button onClick={this.volumeUp} style={styles.btn} className="btn btn-info col">
              <i className="fa fa-share-alt" /> Volume UP
            </button>

            <button onClick={this.muteOn} style={styles.btn} className="btn btn-info col">
              <i className="fa fa-share-alt" /> Mute
            </button>

            <button onClick={this.volumeDown} style={styles.btn} className="btn btn-info col">
              <i className="fa fa-share-alt" /> Volume DOWN
            </button>
          </div>

          <div className="row">
            <button onClick={this.turnOn} style={styles.btn} className="btn btn-info col">
              <i className="fa fa-share-alt" /> Turn ON
            </button>

            <button onClick={this.turnOff} style={styles.btn} className="btn btn-info col">
              <i className="fa fa-share-alt" /> Turn OFF
            </button>
          </div>
        </div>
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
