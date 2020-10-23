import React from 'react'
import mapSquare from '../Assets/parchmentSquare.jpg'
import dirtSquare from '../Assets/dirtSquare.jpg'



class Square extends React.Component {
  constructor() {
    super()
    this.state = {
      roomba: false,
      hasDirt: false,
      id: {
        x: null,
        y: null
      },
      dirtLocations: []
    }
  }

  componentDidMount = () => {
    // console.log(this.props)
    this.setState({
      id: {
        x: this.props.x,
        y: this.props.y,
      },
      dirtLocations: this.props.dirtLocations
    })
    this.containsDirtPile()
  }

  componentDidUpdate = (prevState) => {
    if(this.state.dirtLocations != prevState.dirtLocations) {
      this.containsDirtPile()
    }
  }

  containsDirtPile = () => {
    if(!this.state.hasDirt) {
    this.state.dirtLocations.forEach((el, index) => {
      if(el[0] - 1 === this.state.id.x && el[1] - 1 === this.state.id.y) {
        this.setState({
          hasDirt: true
        })
      }
    })
    }
  }

  render() {
    this.containsDirtPile()
    if(this.state.hasDirt) {
      return (
        <div>
          <img className="treasureMapSquare" src={dirtSquare} />
        </div>
      )
    } else {

    return (
      <div>
        <img className="treasureMapSquare" src={mapSquare} />
      </div>
    )
    }
  }
}

export default Square