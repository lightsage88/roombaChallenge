import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map'

let data = require('./roombaInstructionData.json')

class App extends React.Component {
  constructor() { 
    super()
    this.state = {
      roombaLocation: [1, 1],
      bumpCounter: 0,
      mapMaxY: data.roomDimensions[1],
      mapMaxX: data.roomDimensions[0],
      dirtLocations: [
        [1,2],
        [3,5],
        [5,5],
        [7,9]
      ],
      drivingInstructions: data.drivingInstructions,
      movementCounter: 0,
      dirtCollected: 0
    }
  }

  componentDidMount = () => {
    console.log(data)
    this.autoPilot()
  }

  autoPilot = () => {
    let counter = 0
    let commands = this.state.drivingInstructions
    setTimeout(() => {
        console.log('howdy', this.state.drivingInstructions)
        commands.forEach(el => {
          switch(el) {
            case "N" :
              setTimeout(() => {
                              this.goNorth()

              }, 5000) 
              console.log("N")
              break
            case "S" :
              setTimeout(() => {
                this.goSouth()
              }, 5000) 
               
              console.log("S")

              break;
            case "E" :
              setTimeout(() => {
                this.goEast()
              }, 5000)
              console.log("E")

              break
            case "W" :
              setTimeout(() => {
                this.goWest()
              }, 5000)
              console.log("W")

              break
            default:
              console.log('end of the line')
          }
        })
        
         
    }, 3000)
      
  }

  increaseBump = () => {
    let bumps = this.state.bumpCounter
    bumps++
    this.setState({
      bumpCounter: bumps
    })
  }

  increaseMovementCounter = () => {
    let moves = this.state.movementCounter
    moves++
    this.setState({
      movementCounter: moves
    })
  }

  increaseDirtCollected = (data) => {
    let dirtPile = this.state.dirtCollected
    dirtPile++
    this.setState({
      dirtCollected: dirtPile
    })
  }

  goNorth = () => {
    let currentLocation = this.state.roombaLocation
    if(currentLocation[1] != this.state.mapMaxY) {
      currentLocation[1]++
      this.setState({
        roombaLocation: currentLocation
      })
      this.increaseMovementCounter()
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
      this.increaseMovementCounter()
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
      this.increaseMovementCounter()
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
      this.increaseMovementCounter()
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
          addDirt={() => this.increaseDirtCollected()}
        />
        {/* <StatBox data={}/> */}
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
