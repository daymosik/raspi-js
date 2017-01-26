import React from 'react';
import socket from '../socket';

class Arrows extends React.Component {
  render() {
    const styles = {
      row: {
        marginBottom: '20px'
      },
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
      <div className="row" style={styles.row}>
        <div className="col">
          <div className="row">
            <button onClick={() => this.moveMotor('turnLeft', 140)} style={styles.btn} 
              className="btn btn-info col">
              <i style={styles.iconMirror} className="fa fa-share-alt"></i>
            </button>
            <button onClick={() => this.moveMotor('goForward')} style={styles.btn}
              className="btn btn-info col">
              <i className="fa fa-arrow-up"></i>
            </button>
            <button onClick={() => this.moveMotor('turnRight', 140)} style={styles.btn}
              className="btn btn-info col">
              <i className="fa fa-share-alt"></i>
            </button>
            <div className="w-100"></div>
            <button onClick={() => this.moveMotor('turnLeft')} style={styles.btn}
              className="btn btn-info col">
              <i className="fa fa-arrow-left"></i>
            </button>
            <button onClick={() => this.moveMotor('goBack')} style={styles.btn} 
              className="btn btn-info col">
              <i className="fa fa-arrow-down"></i>
            </button>
            <button onClick={() => this.moveMotor('turnRight')} style={styles.btn} 
              className="btn btn-info col">
              <i className="fa fa-arrow-right"></i>
            </button>
            <div className="w-100"></div>
            <button onClick={() => this.moveServo('lookLeft')} style={styles.btn} 
              className="btn btn-info col">
              <i className="fa fa-chevron-left"></i>
            </button>
            <button onClick={() => (this.moveMotor('stop'),this.moveServo('lookStraight'))} 
              style={styles.btn} className="btn btn-warning col">
              <i className="fa fa-pause"></i>
            </button>
            <button onClick={() => this.moveServo('lookRight')} style={styles.btn}
              className="btn btn-info col">
              <i className="glyphicon fa fa-chevron-right"></i>
            </button>
            <div className="w-100"></div>
            <button onClick={() => this.toggleExploration()} style={styles.btn}
              className="btn btn-info col">
              Exploration
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

  toggleExploration() {
    socket.emit('command.toggleExploration', {});
  }

  constructor(props) {
    super(props);

  }
};

export default Arrows;
