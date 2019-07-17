import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import GameConsoleList from './GameConsoleList'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameconsoles: [],
      gameConsoleMake: '',
      gameConsoleModel: ''
    }
    this.handleGameConsoleMakeChange = this.handleGameConsoleMakeChange.bind(this)
    this.handleGameConsoleModelChange = this.handleGameConsoleModelChange.bind(this)
  }

// Handler functions for text boxes
handleGameConsoleMakeChange(make) {
  this.setState({
    gameConsoleMake: make
  })
}

handleGameConsoleModelChange(model) {
  this.setState({
    gameConsoleModel: model
  })
}









componentDidMount() {
  axios.get('/api/gameconsoles')
  .then(res => {
    this.setState({
    gameconsoles: res.data
    })
  })
}

render() {
  return (
    <div className="App">
      <GameConsoleList gameConsoles={this.state.gameconsoles} />
    </div>
  );
  }  
}

export default App;
