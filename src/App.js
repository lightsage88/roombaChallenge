import React from 'react';
import './App.css'; 
import Map from './Components/Map'
import StatBox from './Components/StatBox'
import StatTable from './Components/StatTable'

let data = require('./roombaInstructionData.json')

class App extends React.Component {
  constructor() { 
    super()
    this.state = {
      // roombaLocation: [],
      roombaLocation: data.initialRoombaLocation,
      travelLog: [],
      actionLog: [" "],
      bumpCounter: 0,
      mapMaxY: data.roomDimensions[1],
      mapMaxX: data.roomDimensions[0],
      dirtLocations: data.dirtLocations,
      foundDirtLocations: [],
      drivingInstructions: data.drivingInstructions,
      movementCounter: 0,
      turnCounter: 0,
      dirtCollected: 0
    }
  }

  componentDidMount = () => {
    const roombaStart = data.initialRoombaLocation
  
    this.setState({
      // roombaLocation: data.initialRoombaLocation,
      travelLog: [roombaStart.join(",")]
    })    
    this.autoPilot()
  }

  waitForPromise = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ms)
      }, ms)
    })
  }

 

  autoPilot = async () => {

    const waitForPromise = (ms) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(ms)
        }, ms)
      })
    }

    let commands = this.state.drivingInstructions
    setTimeout(async() => {
      for(let i = 0; i <= commands.length; i++) {
        this.setState({ turnCounter: this.state.turnCounter + 1 })
        if(commands[i] === "N") {
          this.goNorth()
          await this.waitForPromise(1000)
        }

        if(commands[i] === "S") {
          this.goSouth()
          await this.waitForPromise(1000)
        }

        if(commands[i] === "E") {
          this.goEast()
          await this.waitForPromise(1000)
        }

        if(commands[i] === "W") {
          this.goWest()
          await this.waitForPromise(1000)
        }

      }
    }, 4000) 
  }

  increaseBump = () => {
    let bumps = this.state.bumpCounter
    bumps++
    this.setState({
      bumpCounter: bumps
    })
  }

  increaseMovementCounter = (action) => {
    let moves = this.state.movementCounter
    moves++
    this.setState({
      movementCounter: moves
    })
    this.updateTravelLog()
    this.updateActionLog(action)
    this.checkForDirt()
  }

  checkForDirt = () => {
    let foundDirtLocArray = this.state.foundDirtLocations
    this.state.dirtLocations.forEach(el => {
      if(this.state.roombaLocation[0] === el[0] &&
        this.state.roombaLocation[1] === el[1] &&
        !foundDirtLocArray.includes(el)) {
          foundDirtLocArray.push(el)
          this.setState({
            foundDirtLocations: foundDirtLocArray,
            dirtCollected: this.state.dirtCollected + 1
          })
        }
    })
  }

  updateRoombaLocationLog = () => {

  }

  updateTravelLog = () => {
    let arr = this.state.travelLog
    arr.push(this.state.roombaLocation.join(","))
    this.setState({
      travelLog: arr
    })
  }

  updateActionLog = (action) => {
    let arr = this.state.actionLog
    arr.push(action)
    this.setState({
      actionLog: arr
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
      this.increaseMovementCounter("N")
    } else {
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
      this.increaseMovementCounter("S")
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
      this.increaseMovementCounter("E")
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
      this.increaseMovementCounter("W")
    } else {
      this.increaseBump()
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Roomba Dirt Hunt!</h1>
        <div id="mapAndStatBoxDiv" className="nes-container is-rounded is-dark">
          <Map 
            roombaLocation={this.state.roombaLocation}
            maxX={this.state.mapMaxX} 
            maxY={this.state.mapMaxY}
            dirtLocations={this.state.dirtLocations}
            addDirt={() => this.increaseDirtCollected()}
            travelLog={this.state.travelLog}
            actionLog={this.state.actionLog}
            checkForDirt={(e) => this.checkForDirt()}
          />
          <StatBox
            turnCounter = {this.state.turnCounter}
            roombaLocation = {this.state.roombaLocation.join(",")} 
            movementCounter={this.state.movementCounter}
            dirtCollected={this.state.dirtCollected}
            dirtLocations={this.state.dirtLocations}
            bumps={this.state.bumpCounter}
            actionLog={this.state.actionLog}
          />
        </div>
        <div id="statTableDiv">
          <StatTable 
            turnCounter = {this.state.turnCounter}
            roombaLocation = {this.state.roombaLocation.join(",")} 
            movementCounter={this.state.movementCounter}
            dirtCollected={this.state.dirtCollected}
            dirtLocations={this.state.dirtLocations}
            bumps={this.state.bumpCounter}
            actionLog={this.state.actionLog}
          />
        </div>
      </div>
    );
  }
}

export default App;
