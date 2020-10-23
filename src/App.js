import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map'

class App extends React.Component {
  constructor() { 
    super()
    this.state = {
      mapMaxY: 10,
      mapMaxX: 10,
      dirtLocations: [
        [1,2],
        [3,5],
        [5,5],
        [7,9]
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <header>DJ Roomba in the House!</header>
        <Map 
          maxX={this.state.mapMaxX} 
          maxY={this.state.mapMaxY}
          dirtLocations={this.state.dirtLocations}
        />
      </div>
    );
  }
}

export default App;
