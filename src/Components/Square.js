import React from 'react'
import mapSquare from '../Assets/parchmentSquare.jpg'
import dirtSquare from '../Assets/dirtSquare.jpg'
import Roomba from './Roomba'
let data = require('../roombaInstructionData.json')

//todo: we are doing the dirt finding on the App component
//may need to turn this back into a simple function

class Square extends React.Component {
  constructor() {
    super()

  }

  componentDidMount = () => {
    if(this.props.hasRoomba && this.props.hasDirt) {
      // this.props.foundDirt()
    }
  }


 render() {

 

  if(this.props.hasDirt) {
      return (
        <div className="dirtSquare"></div>
      )
  } else if(this.props.hasRoomba) {
      return( 
        <div>
          <Roomba />
        </div>
      )
    } else if(this.props.hadRoomba) { 
      return(
        <div className="fireSquare">
        </div>
      )
    } else {
      return (
        <div className="regularTreasureMapSquare">
        </div>
      )
    }
  }



}

export default Square