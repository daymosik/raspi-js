import React from 'react';
import socket from '../socket'
import { ProgressBar } from 'react-bootstrap';

class Distance extends React.Component {
  render() {
    const styles = {
      sensorRow: {
        width: 200,
        height: 200,
        backgroundColor: 'blue',
        borderRadius: '50%',
        display: 'inline-block',
        color: 'white',
        paddingTop: '50px'
      },
      counter: {
        lineHeight: '50px',
        fontSize: '20px'
      },
      progressBar: {
        width: '80%',
        display: 'inline-block'
      }
    };

    return (
      <div style={styles.sensorRow} className="row">
        <div className="col-xs-12">
          <p>Distance:</p>
          <p style={styles.counter}>{this.state.cm} cm</p>
          <ProgressBar style={styles.progressBar} bsStyle={this.state.style} now={this.state.cm} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    socket.on('sensor.data', data => this.setDistance(data.cm));
  }

  componentWillUnmount() {

  }

  setDistance(cm) {
    this.setState({
      cm: cm,
      style: cm < 30 ? 'danger' : cm < 60 ? 'warning' : 'success'
    });
  }

  constructor(props) {
    super(props);

    this.state = { cm: 0, style: 'danger' };
  }
};

export default Distance;
