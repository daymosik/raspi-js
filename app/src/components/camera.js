import React from 'react';
import socket from '../socket'

class Camera extends React.Component {
  render() {
    const styles = {
      img: {
        width: '640px',
        height: '480px',
        marginBottom: '20px'
      }
    };

    return (
      <div className="row">
        <div className="col text-center">
          <img src="http://192.168.1.200:8081/" id="stream"
            style={styles.img}/>
        </div>
      </div>
    );
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {

  }

  constructor(props) {
    super(props);

  }
};

export default Camera;
