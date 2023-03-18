import * as React from 'react'
import { Button } from 'reactstrap'

import socket from '@services/socket'

export default class Player extends React.Component<unknown, unknown> {
  public render(): JSX.Element {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <Button color="primary" onClick={this.playRandomSound}>
                Play random!
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  public playRandomSound = (): void => {
    socket.emit('command.playRandomSound')
  }
}
