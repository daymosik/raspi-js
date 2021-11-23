import socket from '@services/socket'
import { PropsWithChildren } from 'react'
import * as React from 'react'

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

export interface ArrowButtonProps {
  onClick: () => void
}

export const ArrowButton = (props: PropsWithChildren<ArrowButtonProps>): JSX.Element => (
  <button onClick={props.onClick} style={styles.btn} className="btn btn-info col">
    {props.children}
  </button>
)

export default class Arrows extends React.Component<unknown, unknown> {
  public render() {
    return (
      <div className="row" style={styles.row}>
        <div className="col">
          <div className="row">
            {/*tslint:disable-next-line jsx-no-lambda*/}
            <ArrowButton onClick={() => this.moveMotor('turnLeft', 140)}>
              <i style={styles.iconMirror} className="fa fa-share-alt" />
            </ArrowButton>
            {/*tslint:disable-next-line jsx-no-lambda*/}
            <ArrowButton onClick={() => this.moveMotor('goForward')}>
              <i className="fa fa-arrow-up" />
            </ArrowButton>
            {/*tslint:disable-next-line jsx-no-lambda*/}
            <ArrowButton onClick={() => this.moveMotor('turnRight', 140)}>
              <i className="fa fa-share-alt" />
            </ArrowButton>
            <div className="w-100" />
            {/*tslint:disable-next-line jsx-no-lambda*/}
            <ArrowButton onClick={() => this.moveMotor('turnLeft')}>
              <i className="fa fa-arrow-left" />
            </ArrowButton>
            {/*tslint:disable-next-line jsx-no-lambda*/}
            <ArrowButton onClick={() => this.moveMotor('goBack')}>
              <i className="fa fa-arrow-down" />
            </ArrowButton>
            {/*tslint:disable-next-line jsx-no-lambda*/}
            <ArrowButton onClick={() => this.moveMotor('turnRight')}>
              <i className="fa fa-arrow-right" />
            </ArrowButton>
            <div className="w-100" />
            <ArrowButton onClick={() => this.moveServo('lookLeft')}>
              <i className="fa fa-chevron-left" />
            </ArrowButton>
            <button onClick={this.stop} style={styles.btn} className="btn btn-warning col">
              <i className="fa fa-pause" />
            </button>
            {/*tslint:disable-next-line jsx-no-lambda*/}
            <ArrowButton onClick={() => this.moveServo('lookRight')}>
              <i className="glyphicon fa fa-chevron-right" />
            </ArrowButton>
            <div className="w-100" />
            {/*tslint:disable-next-line jsx-no-lambda*/}
            <ArrowButton onClick={() => this.toggleExploration()}>Exploration</ArrowButton>
          </div>
        </div>
      </div>
    )
  }

  public stop = (): void => {
    this.moveMotor('stop')
    this.moveServo('lookStraight')
  }

  public moveMotor = (command, speed?): void => {
    socket.emit('command.moveMotor', {
      command,
      speed,
    })
  }

  public moveServo = (command): void => {
    socket.emit('command.moveServo', {
      command,
    })
  }

  public toggleExploration = (): void => {
    socket.emit('command.toggleExploration', {})
  }
}
