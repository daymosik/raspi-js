import * as React from 'react'
import { Button } from 'reactstrap'
import socket from '../socket'

export default class Player extends React.Component {
  public render() {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <Button color="primary" onClick={this.playRandomSound}>Play random!</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public playRandomSound = () => {
    socket.emit('command.playRandomSound')
  }
}
