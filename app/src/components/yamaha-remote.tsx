import socket from '@services/socket'
import * as React from 'react'

export default class YamahaRemote extends React.Component<{}, {}> {
  public render() {
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
        </div>
        <div className="row">

          <button onClick={this.turnOnTv} style={styles.btn} className="btn btn-info col">
            <i className="fa fa-share-alt"/> TV
          </button>

          <button onClick={this.turnOnAppleTv} style={styles.btn} className="btn btn-info col">
            <i className="fa fa-share-alt"/> Apple TV
          </button>

          <button onClick={this.turnOnPlaystation} style={styles.btn} className="btn btn-info col">
            <i className="fa fa-share-alt"/> Playstation
          </button>

        </div>

        <div className="row">

          <button onClick={this.volumeUp} style={styles.btn} className="btn btn-info col">
            <i className="fa fa-share-alt"/> Volume UP
          </button>

          <button onClick={this.volumeDown} style={styles.btn} className="btn btn-info col">
            <i className="fa fa-share-alt"/> Volume DOWN
          </button>

        </div>
      </div>
    )
  }

  public turnOnTv = () => socket.emit('command.yamaha.turnOnTv')

  public turnOnAppleTv = () => socket.emit('command.yamaha.turnOnAppleTv')

  public turnOnPlaystation = () => socket.emit('command.yamaha.turnOnPlaystation')

  public volumeDown = () => socket.emit('command.yamaha.volumeDown')

  public volumeUp = () => socket.emit('command.yamaha.volumeUp')
}
