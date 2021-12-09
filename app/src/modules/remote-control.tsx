import Camera from '@components/camera'
import Joystick, { Coords } from '@components/joystick'
import socket from '@services/socket'
import * as React from 'react'

const RemoteControlView = (): JSX.Element => {
  const onMove = (coords: Coords): void => {
    console.log(coords)

    let command = ''

    if (coords.x < -60) {
      //left
      command = 'turnLeft'
    } else if (coords.y < -60) {
      // top
      command = 'goForward'
    } else if (coords.x > 60) {
      // right
      command = 'turnRight'
    } else if (coords.y > 60) {
      // bottom
      command = 'goBack'
    }

    if (command) {
      socket.emit('command.moveMotor', {
        command,
        speed: undefined,
      })
    }
  }

  return (
    <div className="row">
      <div className="col">
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Joystick onMove={onMove} />
          </div>
          <Camera />
        </div>
      </div>
    </div>
  )
}

export default RemoteControlView
