import React from 'react';
import socket from '../socket'
import { Progress } from 'reactstrap';

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
        <div className="col">
          <div className="row">
            <div className="col">
              <Progress style={styles.progressBar} className={this.state.style} 
                value={this.state.cm} label={this.state.label} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Progress style={styles.progressBar} className={this.state.style} 
                value={this.state.cm} label={this.state.label} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    socket.on('sensor.data', data => this.setDistance(data.cm));
    socket.on('sensorBottom.data', data => {
      console.log(data);
      this.setBottomDistance(data.cm);
    });
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

  setBottomDistance(cm) {
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
