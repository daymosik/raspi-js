import React from 'react';
import socket from '../socket';
import { Button, Form, FormGroup, Input } from 'reactstrap';


class Speech extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <Form action="" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input type="text" name="text" value={this.state.text} onChange={this.handleChange}></Input>
                </FormGroup>
                <Button>Speak!</Button>
              </Form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button color="primary" onClick={() => this.speak()}>Speak fortune!</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  speak(text) {
    socket.emit('command.speak', {
      text
    });
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.speak(this.state.text);
  }

  constructor(props) {
    super(props);

    this.state = { text: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.speak = this.speak.bind(this);
  }
};

export default Speech;
