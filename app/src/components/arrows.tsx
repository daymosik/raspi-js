import * as React from 'react'
import { PropsWithChildren } from 'react'

import socket from '@services/socket'

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
  public render(): JSX.Element {
    return (
      <div className="row" style={styles.row}>
        <div className="col">
          <div className="row">
            <ArrowButton onClick={(): void => this.moveMotor('turnLeft', 140)}>
              <i style={styles.iconMirror} className="fa fa-share-alt" />
            </ArrowButton>
            <ArrowButton onClick={(): void => this.moveMotor('goForward')}>
              <i className="fa fa-arrow-up" />
            </ArrowButton>
            <ArrowButton onClick={(): void => this.moveMotor('turnRight', 140)}>
              <i className="fa fa-share-alt" />
            </ArrowButton>
            <div className="w-100" />
            <ArrowButton onClick={(): void => this.moveMotor('turnLeft')}>
              <i className="fa fa-arrow-left" />
            </ArrowButton>
            <ArrowButton onClick={(): void => this.moveMotor('goBack')}>
              <i className="fa fa-arrow-down" />
            </ArrowButton>
            <ArrowButton onClick={(): void => this.moveMotor('turnRight')}>
              <i className="fa fa-arrow-right" />
            </ArrowButton>
            <div className="w-100" />
            <ArrowButton onClick={(): void => this.moveServo('lookLeft')}>
              <i className="fa fa-chevron-left" />
            </ArrowButton>
            <button onClick={this.stop} style={styles.btn} className="btn btn-warning col">
              <i className="fa fa-pause" />
            </button>
            <ArrowButton onClick={(): void => this.moveServo('lookRight')}>
              <i className="glyphicon fa fa-chevron-right" />
            </ArrowButton>
            <div className="w-100" />
            <ArrowButton onClick={(): void => this.toggleExploration()}>Exploration</ArrowButton>
          </div>
        </div>
      </div>
    )
  }

  public stop = (): void => {
    this.moveMotor('stop')
    this.moveServo('lookStraight')
  }

  public moveMotor = (command: string, speed?: number): void => {
    socket.emit('command.moveMotor', {
      command,
      speed,
    })
  }

  public moveServo = (command: string): void => {
    socket.emit('command.moveServo', {
      command,
    })
  }

  public toggleExploration = (): void => {
    socket.emit('command.toggleExploration', {})
  }
}
