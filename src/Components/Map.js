import React from 'react'
import Square from './Square'

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      length: null,
      height: null,
      dirtLocation: []
    }
  }

  componentDidUpdate = (prevProps) => {
    if(this.props !== prevProps) {
      console.log(this.props)
      this.setState({
        length: this.props.maxX,
        height: this.props.maxY,
        dirtLocations: this.props.dirtLocations
      })
    }
  }

  componentDidMount = () => {
    console.log(this.props)
    this.setState({
      length: this.props.maxX,
      height: this.props.maxY,
      dirtLocations: this.props.dirtLocations


    })
  }

  printGrid = (arr) => {
    return arr.map(row => {
      return <tr>{row}</tr>
    })
  }

  //move this op to the square tiles?
  hasDirt = (x, y) => {
    let dirtLocArr = this.state.dirtLocations
    console.log("has dirt running...", "X is: " + x, "Y is: " + y)
    let value
    dirtLocArr.forEach(el => {
      if(el[0] - 1 === x && el[1] - 1 === y) {
        console.log(el, x, y)
        value = true

      } else {
        value = false
      }
    })
    console.log(value)
    return value
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