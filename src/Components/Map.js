import React from 'react'
import Square from './Square'

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      length: null,
      height: null,
      dirtLocations: [],
      roombaLocation: [],
      travelLog: [],
      travelLogRunning: false,
      actionLog: []
    }
  }

  alertToAddDirt = () => {
    console.log('alertToAddDirtRunning')
    this.props.addDirt()
  }

  componentDidMount = () => {
    this.convertTravelLogEntries(this.props.travelLog)

    this.setState({
      length: this.props.maxX,
      height: this.props.maxY,
      dirtLocations: this.props.dirtLocations,
      travelLog: this.props.travelLog,
      actionLog: this.props.actionLog,
      roombaLocation: this.props.roombaLocation
    })
  }

  componentDidUpdate = (prevProps) => {
    console.log('componentUpdating', prevProps, this.props)
    //1. putting setState chunk here crashes everyhing
    //2. Lets try doing a comparison with prevProps
    //2a. That seems successful!

    if(this.props.travelLog.length !== this.state.travelLog.length && !this.state.travelLogRunning) {
      console.log('detected change in TL')
      this.setState({travelLogRunning: true})
      this.convertTravelLogEntries(this.props.travelLog)
    }

    if(prevProps !== this.props) {
      this.setState({
        length: this.props.maxX,
        height: this.props.maxY,
        dirtLocations: this.props.dirtLocations,
        actionLog: this.props.actionLog,
        roombaLocation: this.props.roombaLocation
  
      })
    }

    
  }

  convertTravelLogEntries = (arr) => {
    let newArr = []
    let a = arr
    let b = Array.from(a)
    newArr= b.map(el => {
      return el.split`,`.map(x => +x)
    })
    this.setState({
      travelLog: newArr,
      travelLogRunning: false
    })
  }

  printGrid = (arr) => {
    return arr.map(row => {
      return <tr>{row}</tr>
    })
  }

  hasDirt = (x, y) => {
    let bool = false
    this.state.dirtLocations.forEach(el => {
      if(el[0] === x + 1 &&
        el[1] === y + 1 &&
        bool === false) {
          bool = true
        }
    })
    return bool
  }

  previouslyHadRoomba = (x, y) => {
    //look through travelLog, make arrays out of each "ENTRY"
    let bool = false

    let array = this.state.travelLog.slice(0, this.state.travelLog.length - 1)
    console.log('ze array', array)
    array.forEach(el => {
      if(el[0] === x + 1 &&
        el[1] === y + 1 &&
        bool === false ) {
          bool = true
        } 
    })
    //say that if c, i match any of them, EXCEPT THE LAST ENTRY,
    //return true
    return bool
  }

  hasRoomba = (x, y) => {
    console.log('hasDirt running...current roomba location is: ' + this.state.roombaLocation)
    console.log('coordinates of square are: ' + x + ', ' + y)
    if(this.state.roombaLocation[0] === x + 1 &&
      this.state.roombaLocation[1] === y + 1) {
        return true
      } else {
        return false
      }
  }

  checkForDirtInMap = () => {
    this.props.checkForDirt()
  }


  render() {
    console.log(this.state.dirtLocations, this.props.roombaLocation)
    const length = this.state.length
    const height = this.state.height
    let randomKeyGen = Math.floor((Math.random() * 100000) + 1)
    let arrayOfMapSquares = []

    for(let i = length - 1; i >= 0; i--) {
      let row = []

      for(let c = 0; c < height; c++) {
        console.log("coordinates being planned", c, i)
        //check for dirt collected
        // this.checkForDirtInMap()
        row.push(
          <td>
            <Square 
              x={c}
              y={i}
              key={randomKeyGen}
              roombaLocation={this.props.roombaLocation}
              hasRoomba={this.hasRoomba(c, i)}
              hadRoomba={this.previouslyHadRoomba(c, i)}
              hasDirt={this.hasDirt(c, i)}
              foundDirt={this.props.checkForDirt}
            />
          </td>
        )
        randomKeyGen++
      }
      arrayOfMapSquares.push(row)
    }


    return (
      <div>
        <table>
          <tbody>
            {this.printGrid(arrayOfMapSquares)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Map