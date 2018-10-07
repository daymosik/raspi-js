import * as React from 'react'
import socket from '../socket'

export default class Arrows extends React.Component<{}, {}> {
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
      <div className="row" style={styles.row}>
        <div className="col">
          <div className="row">
            <button
              onClick={
                // tslint:disable-next-line jsx-no-lambda
                () => this.moveMotor('turnLeft', 140)
              }
              style={styles.btn}
              className="btn btn-info col"
            >
              <i style={styles.iconMirror} className="fa fa-share-alt"/>
            </button>
            <button
              onClick={
                // tslint:disable-next-line jsx-no-lambda
                () => this.moveMotor('goForward')
              }
              style={styles.btn}
              className="btn btn-info col"
            >
              <i className="fa fa-arrow-up"/>
            </button>
            <button
              onClick={
                // tslint:disable-next-line jsx-no-lambda
                () => this.moveMotor('turnRight', 140)
              }
              style={styles.btn}
              className="btn btn-info col"
            >
              <i className="fa fa-share-alt"/>
            </button>
            <div className="w-100"/>
            <button
              onClick={
                // tslint:disable-next-line jsx-no-lambda
                () => this.moveMotor('turnLeft')
              }
              style={styles.btn}
              className="btn btn-info col"
            >
              <i className="fa fa-arrow-left"/>
            </button>
            <button
              onClick={
                // tslint:disable-next-line jsx-no-lambda
                () => this.moveMotor('goBack')
              }
              style={styles.btn}
              className="btn btn-info col"
            >
              <i className="fa fa-arrow-down"/>
            </button>
            <button
              onClick={
                // tslint:disable-next-line jsx-no-lambda
                () => this.moveMotor('turnRight')
              }
              style={styles.btn}
              className="btn btn-info col"
            >
              <i className="fa fa-arrow-right"/>
            </button>
            <div className="w-100"/>
            <button
              onClick={
                // tslint:disable-next-line jsx-no-lambda
                () => this.moveServo('lookLeft')
              }
              style={styles.btn}
              className="btn btn-info col"
            >
              <i className="fa fa-chevron-left"/>
            </button>
            <button
              onClick={this.stop}
              style={styles.btn}
              className="btn btn-warning col"
            >
              <i className="fa fa-pause"/>
            </button>
            <button
              onClick={
                // tslint:disable-next-line jsx-no-lambda
                () => this.moveServo('lookRight')
              }
              style={styles.btn}
              className="btn btn-info col"
            >
              <i className="glyphicon fa fa-chevron-right"/>
            </button>
            <div className="w-100"/>
            <button
              onClick={
                // tslint:disable-next-line jsx-no-lambda
                () => this.toggleExploration()
              }
              style={styles.btn}
              className="btn btn-info col"
            >
              Exploration
            </button>
          </div>
        </div>
      </div>
    )
  }

  public stop = () => {
    this.moveMotor('stop')
    this.moveServo('lookStraight')
  }

  public moveMotor = (command, speed?) => {
    socket.emit('command.moveMotor', {
      command, speed,
    })
  }

  public moveServo = (command) => {
    socket.emit('command.moveServo', {
      command,
    })
  }

  public toggleExploration = () => {
    socket.emit('command.toggleExploration', {})
  }
}
