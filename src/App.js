import React from 'react';
// import update from 'immutability-helper' 
import './App.css'; 
import Map from './Components/Map'
import StatBox from './Components/StatBox'

let data = require('./roombaInstructionData.json')

class App extends React.Component {
  constructor() { 
    super()
    this.state = {
      roombaLocation: [],
      travelLog: [],
      actionLog: [" "],
      bumpCounter: 0,
      mapMaxY: data.roomDimensions[1],
      mapMaxX: data.roomDimensions[0],
      dirtLocations: data.dirtLocations,
      drivingInstructions: data.drivingInstructions,
      movementCounter: 0,
      dirtCollected: 0
    }
  }

  componentDidMount = () => {
    console.log(data)
    const roombaStart = data.initialRoombaLocation
  
    this.setState({
      roombaLocation: data.initialRoombaLocation,
      travelLog: [roombaStart.join(",")]
    })    
    // this.autoPilot()
  }

  componentDidUpdate = (prevState) => {
    // if(this.state.roombaLocation != prevState.roombaLocation) {
    //   let travelLogArr = this.state.travelLog
    //   travelLogArr.push(this.state.roombaLocation)
    //   this.setState({
    //     travelLog: travelLogArr
    //   })
    // }
    // let dirtSquares = this.state.dirtLocations
    // if(this.state.roombaLocation != prevState.roombaLocation &&
    //   this.state.dirtCollected <= dirtSquares.length
    //   ) {
    //   dirtSquares.forEach(el => {
    //     console.log('CDUpdate', el, this.state.roombaLocation)
        
    //     if(this.state.roombaLocation[0] === el[0] && this.state.roombaLocation[1] === el[1]) {
    //       console.log('yeehaw')
    //       alert(this.state.roombaLocation)
    //       this.setState({
    //         dirtCollected: this.state.dirtCollected++
    //       })
    //     }
    //   })
    // }
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

  increaseMovementCounter = (action) => {
    let moves = this.state.movementCounter
    moves++
    this.setState({
      movementCounter: moves
    })
    this.updateTravelLog()
    this.updateActionLog(action)
    // this.checkForDirt()
  }

  checkForDirt = () => {
    console.log("checkForDirt Running")
    this.setState({
      dirtCollected: this.dirtCollected++
    })
  }

  updateTravelLog = () => {
    console.log(this.state.roombaLocation.join(","))
    let arr = this.state.travelLog
    arr.push(this.state.roombaLocation.join(","))
    console.log(arr)
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

  goNorth =() => {
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
        <header>DJ Roomba in the House!</header>
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
        <StatBox data={this.state}/>
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
