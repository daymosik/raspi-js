import React from 'react';
import socket from '../socket'

class Arrows extends React.Component {
  render() {
    const styles = {
      btn: {
        height: '100%',
        height: '100px',
        fontSize: '30px'
      },
      iconMirror: {
        transform: 'matrix(-1, 0, 0, 1, 0, 0)'
      }
    };

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <button onClick={() => this.moveMotor('turnLeft', 140)} style={styles.btn} 
              className="btn btn-info col-xs-4">
              <i style={styles.iconMirror} className="glyphicon glyphicon-share-alt"></i>
            </button>
            <button onClick={() => this.moveMotor('goForward')} style={styles.btn}
              className="btn btn-info col-xs-4">
              <i className="glyphicon glyphicon-arrow-up"></i>
            </button>
            <button onClick={() => this.moveMotor('turnRight', 140)} style={styles.btn}
              className="btn btn-info col-xs-4">
              <i className="glyphicon glyphicon-share-alt"></i>
            </button>
          </div>
          <div style={styles.insideRow} className="row">
            <button onClick={() => this.moveMotor('turnLeft')} style={styles.btn}
              className="btn btn-info col-xs-4">
              <i className="glyphicon glyphicon-arrow-left"></i>
            </button>
            <button onClick={() => this.moveMotor('goBack')} style={styles.btn} 
              className="btn btn-info col-xs-4">
              <i className="glyphicon glyphicon-arrow-down"></i>
            </button>
            <button onClick={() => this.moveMotor('turnRight')} style={styles.btn} 
              className="btn btn-info col-xs-4">
              <i className="glyphicon glyphicon-arrow-right"></i>
            </button>
          </div>
          <div style={styles.insideRow} className="row">
            <button onClick={() => this.moveServo('lookLeft')} style={styles.btn} 
              className="btn btn-info col-xs-4">
              <i className="glyphicon glyphicon-chevron-left"></i>
            </button>
            <button onClick={() => (this.moveMotor('stop'),this.moveServo('lookStraight'))} 
              style={styles.btn} className="btn btn-warning col-xs-4">
              <i className="glyphicon glyphicon-pause"></i>
            </button>
            <button onClick={() => this.moveServo('lookRight')} style={styles.btn}
              className="btn btn-info col-xs-4">
              <i className="glyphicon glyphicon glyphicon-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  moveMotor(command, speed) {
    socket.emit('command.moveMotor', {
      command, speed
    });
  }

  moveServo(command) {
    socket.emit('command.moveServo', {
      command
    });
  }

  constructor(props) {
    super(props);

  }
};

export default Arrows;
