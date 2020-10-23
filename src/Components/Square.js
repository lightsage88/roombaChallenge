import React from 'react'
import mapSquare from '../Assets/parchmentSquare.jpg'
import dirtSquare from '../Assets/dirtSquare.jpg'
import Roomba from './Roomba'



class Square extends React.Component {
  constructor() {
    super()
    this.state = {
      hadRoomba: false,
      hasRoomba: false,
      hasDirt: false,
      id: {
        x: null,
        y: null
      },
      dirtLocations: [],
      roombaLocations: []
    }
  }

  componentDidMount = () => {
    // console.log(this.props)
    this.setState({
      id: {
        x: this.props.x,
        y: this.props.y,
      },
      dirtLocations: this.props.dirtLocations,
      roombaLocations: this.props.roombaLocations
    })
    this.containsDirtPile()
    // this.hasRoomba()

  }

  componentDidUpdate = (prevState) => {
    if(this.state.hasDirt != prevState.hasDirt ||
        this.state.hasRoomba != prevState.hasRoomba
      ) {
      this.containsDirtPile()
      this.hasRoomba()
    }
  }

  hasRoomba = () => {
    if(!this.state.hadRoomba){
      console.log('running hasroomba', this.state,
      this.props.roombaLocations[this.props.roombaLocations.length - 1][0],
      this.props.roombaLocations[this.props.roombaLocations.length - 1][1])
      if(this.props.roombaLocations[this.props.roombaLocations.length - 1][0] - 1 === this.state.id.x &&
        this.props.roombaLocations[this.props.roombaLocations.length - 1][1] -1 === this.state.id.y) {
          this.setState({
            hasRoomba: true,
            hadRoomba: true
          })
        }
    }
  }

  containsDirtPile = () => {
    if(!this.state.hasDirt) {
    this.state.dirtLocations.forEach(el => {
      if(el[0] - 1 === this.state.id.x && el[1] - 1 === this.state.id.y) {
        this.setState({
          hasDirt: true
        })
      }
    })
    }
  }

  roombaDiscoversDirt = () => {
    if(this.state.hasDirt){
      this.setState({
        hasDirt: false,
        hadDirt: true
      })
      this.props.alertToAddDirt()
    }
  }

  render() {
    this.containsDirtPile()
    if(this.state.hasRoomba && this.state.hasDirt) {
      // this.setState({ hasDirt: false})
      this.roombaDiscoversDirt()
      return(
        <div>
          <Roomba />
        </div>
      )
    } else if(this.state.hasDirt) {
      return (
          <img className="treasureMapSquare" src={dirtSquare} />
        
      )
    } else if(this.state.hasRoomba) {
      return( 
        <div>
          <Roomba />
        </div>
      )
    }   else {
      return (
        <div className="regularTreasureMapSquare">
        </div>
      )
    }
  }
}

export default Square