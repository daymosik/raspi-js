import Camera from '@components/camera'
import Joystick from '@components/joystick'
import socket from '@services/socket'
import * as React from 'react'
import { JoystickCoords } from '../models/motors'

const RemoteControlView = (): JSX.Element => {
  const onMove = (coords: JoystickCoords): void => {
    console.log(coords)
    socket.emit('command.handleJoystick', coords)
  }

  const onStart = (): void => {
    console.log('onStart')
  }

  const onEnd = (): void => {
    console.log('onEnd')
    socket.emit('command.stopMotor', {})
  }

  return (
    <div className="d-flex flex-wrap gap-1">
      <div className="" style={{ flexGrow: 1 }}>
        <Camera />
      </div>
      <div className="" style={{ flexBasis: '300px' }}>
        <div className="card bg-dark mb-4" style={{ borderRadius: '1rem' }}>
          <div className="card-body p-3">
            {/*<div style={{ position: 'relative', minHeight: '300px' }}>*/}
            {/*  <div style={{ position: 'absolute', bottom: 0, right: 0 }}>*/}
            <Joystick onMove={onMove} onStart={onStart} onEnd={onEnd} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoteControlView
