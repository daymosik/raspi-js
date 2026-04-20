import * as React from 'react'

import socket from '@services/socket'

export interface DistanceObject {
  cm: number
  style: string
  label: string
}

export interface DistanceState {
  left: DistanceObject
  right: DistanceObject
}

const styles = {
  progressBar: {
    width: '100%',
    height: '60px',
    lineHeight: '60px',
    fontSize: '20px',
  },
}

export default class Distance extends React.Component<unknown, DistanceState> {
  constructor(props: unknown) {
    super(props)

    this.state = {
      left: {
        cm: 0,
        style: 'danger',
        label: '',
      },
      right: {
        cm: 0,
        style: 'danger',
        label: '',
      },
    }
  }

  public componentDidMount(): void {
    socket.on('leftSensor.data', (data) => this.setLeftDistance(data.cm))
    socket.on('rightSensor.data', (data) => this.setRightDistance(data.cm))
  }

  public render(): React.ReactElement {
    return (
      <div className="row">
        <div className="col">
          <div className="progress" style={styles.progressBar}>
            <div
              className={`progress-bar bg-${this.state.left.style}`}
              role="progressbar"
              style={{ width: `${this.state.left.cm}%` }}
              aria-valuenow={this.state.left.cm}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {this.state.left.label}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="progress" style={styles.progressBar}>
            <div
              className={`progress-bar bg-${this.state.right.style}`}
              role="progressbar"
              style={{ width: `${this.state.right.cm}%` }}
              aria-valuenow={this.state.right.cm}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {this.state.right.label}
            </div>
          </div>
        </div>
      </div>
    )
  }

  public setLeftDistance = (cm: number): void => {
    this.setState({
      left: {
        cm,
        style: this.distanceStyle(cm),
        label: `${cm}cm`,
      },
    })
  }

  public setRightDistance = (cm: number): void => {
    this.setState({
      right: {
        cm,
        style: this.distanceStyle(cm),
        label: `${cm}cm`,
      },
    })
  }

  public distanceStyle = (cm: number): string => (cm < 30 ? 'danger' : cm < 60 ? 'warning' : 'success')
}
