import * as React from 'react'
import { PropsWithChildren } from 'react'

import socket from '@services/socket'

const styles = {
  btn: {
    height: '100px',
    fontSize: '30px',
    flexBasis: '32%',
    flexGrow: 1,
  },
  iconMirror: {
    transform: 'matrix(-1, 0, 0, 1, 0, 0)',
  },
}

export interface ArrowButtonProps {
  onClick: () => void
  btnClassName?: string
}

export const ArrowButton = (props: PropsWithChildren<ArrowButtonProps>): JSX.Element => (
  <button onClick={props.onClick} style={styles.btn} className={`btn ${props.btnClassName || 'btn-secondary'}`}>
    {props.children}
  </button>
)

export default class Arrows extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
    return (
      <div className="d-flex flex-wrap gap-1">
        <ArrowButton onClick={(): void => this.moveMotor('turnLeft', 140)}>
          <i style={styles.iconMirror} className="fa fa-share-alt fa-lg" />
        </ArrowButton>
        <ArrowButton onClick={(): void => this.moveMotor('goForward')}>
          <i className="fa fa-arrow-up fa-lg" />
        </ArrowButton>
        <ArrowButton onClick={(): void => this.moveMotor('turnRight', 140)}>
          <i className="fa fa-share-alt fa-lg" />
        </ArrowButton>
        <div className="w-100" />
        <ArrowButton onClick={(): void => this.moveMotor('turnLeft')}>
          <i className="fa fa-arrow-left fa-lg" />
        </ArrowButton>
        <ArrowButton onClick={(): void => this.moveMotor('goBack')}>
          <i className="fa fa-arrow-down fa-lg" />
        </ArrowButton>
        <ArrowButton onClick={(): void => this.moveMotor('turnRight')}>
          <i className="fa fa-arrow-right fa-lg" />
        </ArrowButton>
        <ArrowButton onClick={(): void => this.moveServo('lookLeft')}>
          <i className="fa fa-chevron-left fa-lg" />
        </ArrowButton>
        <ArrowButton onClick={this.stop} btnClassName="btn-warning">
          <i className="fa fa-pause fa-lg" />
        </ArrowButton>
        <ArrowButton onClick={(): void => this.moveServo('lookRight')}>
          <i className="glyphicon fa fa-chevron-right fa-lg" />
        </ArrowButton>
        <div className="w-100" />
        <ArrowButton onClick={this.toggleExploration}>Exploration</ArrowButton>
        <div className="w-100" />
        <ArrowButton onClick={this.closeDoors}>
          <i className="fa fa-chevron-down fa-lg" />
        </ArrowButton>
        <ArrowButton onClick={this.stopDoors}>
          <i className="fa fa-square-full fa-lg" />
        </ArrowButton>
        <ArrowButton onClick={this.openDoors}>
          <i className="fa fa-chevron-up fa-lg" />
        </ArrowButton>
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

  public openDoors = (speed?: number): void => {
    socket.emit('command.openDoors', {
      speed,
    })
  }

  public closeDoors = (speed?: number): void => {
    socket.emit('command.closeDoors', {
      speed,
    })
  }

  public stopDoors = (): void => {
    socket.emit('command.stopDoors')
  }

  public toggleExploration = (): void => {
    socket.emit('command.toggleExploration', {})
  }
}
