import socket from './socket'
import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import Arrows from './components/arrows';
import Distance from './components/distance';

class Wrapper extends React.Component {
  render() {
    const styles = {
      container: {
        paddingTop: '20px'
      }
    };

    return (
      <div style={styles.container} className="container">
        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-3 text-center">
            <Distance />
            <Arrows />
          </div>
        </div>
      </div>
    );
  }
};

ReactDOM.render(<Wrapper />, document.getElementById('root'));
