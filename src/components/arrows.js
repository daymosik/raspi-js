import React from 'react';
import socket from '../socket'

const MOVE_COMMANDS = [
  'turnLeft', 'turnRight', 'goForward', 'goBack'
];

class Arrows extends React.Component {
  render() {
    const styles = {
      arrowsRow: {
        width: 200,
        height: 200,
        backgroundColor: 'blue',
        borderRadius: '50%',
        display: 'inline-block'
      },
      insideRow: {
        height: 200 / 3,
        paddingTop: 15
      }
    };

    return (
      <div style={styles.arrowsRow} className="row">
        <div className="col-xs-12">
          <div style={styles.insideRow} className="row">
            <div className="col-xs-4"></div>
            <div className="col-xs-4 text-center">
              <button onClick={() => this.emitMove('goForward')} className="btn btn-info">
                <i className="glyphicon glyphicon-arrow-up"></i>
              </button>
            </div>
            <div className="col-xs-4"></div>
          </div>
          <div style={styles.insideRow} className="row">
            <div className="col-xs-4 text-center">
              <button onClick={() => this.emitMove('turnLeft')} className="btn btn-info">
                <i className="glyphicon glyphicon-arrow-left"></i>
              </button>
            </div>
            <div className="col-xs-4 text-center">
              <button onClick={() => this.emitMove('stop')} className="btn btn-warning">
                <i className="glyphicon glyphicon-pause"></i>
              </button>
            </div>
            <div className="col-xs-4 text-center">
              <button onClick={() => this.emitMove('turnRight')} className="btn btn-info">
                <i className="glyphicon glyphicon-arrow-right"></i>
              </button>
            </div>
          </div>
          <div style={styles.insideRow} className="row">
            <div className="col-xs-4"></div>
            <div className="col-xs-4 text-center">
              <button onClick={() => this.emitMove('goBack')} className="btn btn-info">
                <i className="glyphicon glyphicon-arrow-down"></i>
              </button>
            </div>
            <div className="col-xs-4"></div>
          </div>
        </div>
      </div>
    );
  }

  emitMove(command) {
    socket.emit('command.move', {
      command
    });
  }

  constructor(props) {
    super(props);
  }
};

export default Arrows;
