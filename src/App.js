import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map'

class App extends React.Component {
  constructor() { 
    super()
    this.state = {
      roombaLocation: [1, 1],
      bumpCounter: 0,
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

  increaseBump = () => {
    this.setState({
      bumpCounter: this.state.bumpCounter + 1
    })
  }

  goNorth = () => {
    let currentLocation = this.state.roombaLocation
    if(currentLocation[1] != this.state.mapMaxY) {
      currentLocation[1]++
      this.setState({
        roombaLocation: currentLocation
      })
    } else {
      console.log('make with the bump')
      this.increaseBump()
    }
  }

  goSouth = () => {
    let currentLocation = this.state.roombaLocation
    if(currentLocation[1] != 1) {
      currentLocation[1]--
      this.setState({
        roombaLocation: currentLocation
      })
    } else {
      this.increaseBump()
    }
  }

  goEast = () => {
    let currentLocation = this.state.roombaLocation
    if(currentLocation[0] != this.state.mapMaxX) {
      currentLocation[0]++
      this.setState({
        roombaLocation: currentLocation
      })
    } else {
      this.increaseBump()
    }
  }

  goWest = () => {
    let currentLocation = this.state.roombaLocation
    if(currentLocation[0] != 1) {
      currentLocation[0]--
      this.setState({
        roombaLocation: currentLocation
      })
    } else {
      this.increaseBump()
    }
  }

  render() {
    return (
      <div className="App">
        <header>DJ Roomba in the House!</header>
        <Map 
          roombaLocation={this.state.roombaLocation}
          maxX={this.state.mapMaxX} 
          maxY={this.state.mapMaxY}
          dirtLocations={this.state.dirtLocations}
        />
        <button 
          onClick={()=> {
            console.log('yo')
            this.goNorth()
          }}
        >
          North
        </button>
        <button 
          onClick={()=> {
            console.log('yo')
            this.goSouth()
          }}
        >
          South
        </button>
        <button 
          onClick={()=> {
            console.log('yo')
            this.goEast()
          }}
        >
          East
        </button>
        <button 
          onClick={()=> {
            console.log('yo')
            this.goWest()
          }}
        >
          West
        </button>

      </div>
    );
  }
}

export default App;
