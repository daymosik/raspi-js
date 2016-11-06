import socket from './socket'
import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import Arrows from './components/arrows';

class Wrapper extends React.Component {
  render() {
    const styles = {
      container: {
        paddingTop: '50px'
      }
    };

    return (
      <div style={styles.container} className="container">
        <div className="row">
          <div className="col-xs-30 text-center">
            <Arrows />
          </div>
        </div>
      </div>
    );
  }
};

ReactDOM.render(<Wrapper />, document.getElementById('root'));
