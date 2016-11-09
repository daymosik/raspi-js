import React from 'react';
import socket from '../socket'
import { ProgressBar } from 'react-bootstrap';

class Distance extends React.Component {
  render() {
    const styles = {
      progressBar: {
        width: '100%',
        height: '60px',
        lineHeight: '60px',
        fontSize: '20px'
      }
    };

    return (
      <div className="row">
        <div className="col-xs-12">
          <ProgressBar style={styles.progressBar} bsStyle={this.state.style} 
            now={this.state.cm} label={this.state.label} srOnly />
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
      style: cm < 30 ? 'danger' : cm < 60 ? 'warning' : 'success',
      label: `${cm}cm`
    });
  }

  constructor(props) {
    super(props);

    this.state = { cm: 0, style: 'danger', label: '' };
  }
};

export default Distance;
