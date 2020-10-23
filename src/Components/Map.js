import React from 'react'
import Square from './Square'

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      length: null,
      height: null,
      dirtLocation: [],
      roombaLocations: []
    }
  }

  alertToAddDirt = () => {
    console.log('alertToAddDirtRunning')
    this.props.addDirt()
  }

  componentDidMount = () => {
    console.log(this.props)
    let roombaLocArray = []
    roombaLocArray.push(this.props.roombaLocation)

    this.setState({
      length: this.props.maxX,
      height: this.props.maxY,
      dirtLocations: this.props.dirtLocations,
      roombaLocations: roombaLocArray

    })
  }

  componentDidUpdate = (prevProps) => {
    if(this.props !== prevProps) {
      let roombaLocArray = [this.state.roombaLocations]
      roombaLocArray.push(this.props.roombaLocation)
      console.log(this.props)
      this.setState({
        length: this.props.maxX,
        height: this.props.maxY,
        dirtLocations: this.props.dirtLocations,
        roombaLocations: roombaLocArray
      })
    }
  }



  printGrid = (arr) => {
    return arr.map(row => {
      return <tr>{row}</tr>
    })
  }


  render() {
    console.log(this.state.dirtLocations)
    const length = this.state.length
    const height = this.state.height
    let randomKeyGen = Math.floor((Math.random() * 100000) + 1)
    let arrayOfMapSquares = []

    for(let i = length - 1; i >= 0; i--) {
      let row = []

      for(let c = 0; c < height; c++) {
        row.push(
          <td>
            <Square 
              x={c}
              y={i}
              key={randomKeyGen}
              dirtLocations={this.props.dirtLocations}
              roombaLocations={this.state.roombaLocations}
              alertToAddDirt={() => this.alertToAddDirt()}
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