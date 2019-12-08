import ReactDOM from 'react-dom';
import React, { Component } from 'react';

class MainPage extends Component {
  render () {
    return (
      <h1> Hello World from React! </h1>
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
