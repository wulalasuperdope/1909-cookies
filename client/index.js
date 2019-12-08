import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';

class MainPage extends Component {
  constructor(){
    super(),
    this.state = {
      username: '',
      password: '',
      loggerIn: false,
      logInError: false,
    }
  }

  handleChange = (evt) => {
    const { name, value } = evt.target
    //console.log(evt.target)
    this.setState({
      [name]: value,
    })
    //console.log(this.state)
  }

  handleLogin = (e) => {
    e.preventDefault();
    axios.post('/login', this.state)
    .then(() => {
      //console.log(this.state)
      this.setState({
        loggedIn: true,
      })
    })
    .catch(() => {
      this.setState({
        logInError: true,
      })
    })
  }

  render () {
    return (
      <div>
        <h1> Hello World from React! </h1>
        <form>
        <label>
          Username:
          <input type="text" name="username" onChange={this.handleChange}></input>
        </label>
        <label>
        Password:
          <input type="text" name="password" onChange={this.handleChange}></input>
          </label>
          <button onClick={this.handleLogin}>log in</button>
        </form>
     </div> 
    )
  }
}

ReactDOM.render(
  <MainPage />,
  document.querySelector('#app'),
  () => {
    console.log('Application rendered!');
  },
);
