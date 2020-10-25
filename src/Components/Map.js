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
      actionLog: []
    }
  }

  alertToAddDirt = () => {
    console.log('alertToAddDirtRunning')
    this.props.addDirt()
  }

  componentDidMount = () => {

    this.setState({
      length: this.props.maxX,
      height: this.props.maxY,
      dirtLocations: this.props.dirtLocations,
      travelLog: this.props.travelLog,
      actionLog: this.props.actionLog,
      roombaLocation: this.props.roombaLocation
      // roombaLocations: roombaLocArray

    })
  }

  componentDidUpdate = (prevProps) => {
    //1. putting setState chunk here crashes everyhing
    //2. Lets try doing a comparison with prevProps
    //2a. That seems successful!
    if(prevProps !== this.props) {
      this.setState({
        length: this.props.maxX,
        height: this.props.maxY,
        dirtLocations: this.props.dirtLocations,
        travelLog: this.props.travelLog,
        actionLog: this.props.actionLog,
        roombaLocation: this.props.roombaLocation
        // roombaLocations: roombaLocArray
  
      })
    }
  }



  printGrid = (arr) => {
    return arr.map(row => {
      return <tr>{row}</tr>
    })
  }

  hasRoomba = (c, i) => {
    console.log('hasDirt running...current roomba location is: ' + this.state.roombaLocation)
    console.log('coordinates of square are: ' + c + ', ' + i)
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
        row.push(
          <td>
            <Square 
              x={c}
              y={i}
              key={randomKeyGen}
              roombaLocation={this.props.roombaLocation}
              hasRoomba={this.hasRoomba(c, i)}
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