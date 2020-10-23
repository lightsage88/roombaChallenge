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
      }
    }
  }

  componentDidMount = () => {
    console.log(this.props)
    this.setState({
      x: this.props.x,
      y: this.props.y,
      hasDirt: this.props.hasDirt
    })
  }

  render() {

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