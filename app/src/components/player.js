import React from 'react';
import socket from '../socket';
import { Button } from 'reactstrap';


class Player extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <Button color="primary" onClick={() => this.playRandomSound()}>Play random!</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  playRandomSound() {
    socket.emit('command.playRandomSound');
  }

  constructor(props) {
    super(props);
  }
};

export default Player;
