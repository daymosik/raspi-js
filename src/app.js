import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import Navbar from './Components/header/navbar';

const socket = io.connect('http://192.168.1.200:8080', { reconnect: true });

socket.on('connect', socket => {
  console.log('Connected!');
});

socket.emit('command.move', {
	command: 'goForward'
});

class Wrapper extends React.Component {
  render() {
    return (
    	<div>
	    	<Navbar />
		    <div className="container">
		      <div className="jumbotron">
		        <h1>Navbar example</h1>
		        <p>This example is a quick exercise to illustrate how the default, static and fixed to top navbar work.</p>
		        <p>To see the difference between static and fixed top navbars, just scroll.</p>
		        <p>
		          <a className="btn btn-lg btn-primary" role="button">View navbar docs »</a>
		        </p>
		      </div>
	      </div>
      </div>
    );
  }
};

ReactDOM.render(<Wrapper />, document.getElementById('root'));