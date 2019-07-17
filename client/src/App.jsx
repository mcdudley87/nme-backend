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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

// Handler functions for text boxes
handleSubmit(e) {
  axios.post('/gameconsoles', {
    make: this.state.gameConsoleMake,
    model: this.state.gameConsoleModel
  }).then(function(response) {
    axios.get('/gameconsoles').then(function(gameConsoles) {
      this.setState({
        gameConsoles
      })
    })
  })
}

handleGameConsoleMakeChange(e) {
  this.setState({
    gameConsoleMake: e.target.value
  })
}

handleGameConsoleModelChange(e) {
  this.setState({
    gameConsoleModel: e.target.value
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
      <GameConsoleList gameConsoles={this.state.gameconsoles} 
                        handleGameConsoleMakeChange={this.handleGameConsoleMakeChange}
                        handleGameConsoleModelChange={this.handleGameConsoleModelChange}
                        make={this.state.gameConsoleMake}
                        model={this.state.gameConsoleModel}
                        handleSubmit={this.handleSubmit}
      />                      
    </div>
  );
  }  
}

export default App;
