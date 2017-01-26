import React from 'react';
import socket from '../socket'
import { CirclePicker } from 'react-color';

class RGB extends React.Component {
  render() {
    const styles = {
      circlePicker: {
        // width: '100%',
        // height: '60px'
      }
    };

    return (
      <div className="row">
        <div className="col">
          <CirclePicker
            width="100%"
            circleSize="36"
            onChangeComplete={ this.handleChangeComplete }
            style={styles.circlePicker} />
        </div>
      </div>
    );
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleChangeComplete(color) {
    socket.emit('command.changeRGBColor', {
      color: color.hex
    });
  }

  constructor(props) {
    super(props);

  }
};

export default RGB;
