import React from 'react'
import mapSquare from '../Assets/parchmentSquare.jpg'
import dirtSquare from '../Assets/dirtSquare.jpg'
import Roomba from './Roomba'
let data = require('../roombaInstructionData.json')



function Square(props) {
  // console.log('Square here', props)
  if(props.hasRoomba) {
    return( 
      <div>
        <Roomba />
      </div>
    )
  } else {
    return (
      <div className="regularTreasureMapSquare">
      </div>
    )
  }


    // if(this.props.hasRoomba && this.props.hasDirt) {
    //         return(
    //           <div>
    //             <Roomba />
    //           </div>
    //         )
    //       } else if(this.props.hasDirt) {
    //         return (
    //             <img className="treasureMapSquare" src={dirtSquare} />
              
    //         )
    //       } else if(this.props.hasRoomba) {
    //         return( 
    //           <div>
    //             <Roomba />
    //           </div>
    //         )
    //       }   else {
            
          // }
  


}

// class Square extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       hadRoomba: false,
//       hasRoomba: false,
//       hasDirt: false,
//       id: {
//         x: null,
//         y: null
//       },
//       roombaLocation: {
//         x: null,
//         y:null
//       },
//       dirtLocations: data.dirtLocations,
//       roombaLocations: [],
//     }
//   }

//   componentDidMount = () => {
//     console.log(this.props)
//     this.setState({
//       id: {
//         x: this.props.x,
//         y: this.props.y,
//       },
//       roombaLocation: {
//         x: this.props.roombaLocation[0] - 1,
//         y: this.props.roombaLocation[1] - 1
//       },
//       roombaLocations: []
//     })
//     // this.containsDirtPile()
//     // this.hasRoomba()
//     // this.roombaCheck()

//   }

//   componentDidUpdate = (prevState) => {
//     console.log('compDU running')
//     if(this.state.id.x === this.state.roombaLocation.x &&
//       this.state.id.y === this.state.roombaLocation.y){
//     this.roombaCheck()
//       }
//   }

//   roombaCheck = () => {
//     console.log(this.state.id, this.state.roombaLocation)
    
//     if(!this.state.hasRoomba &&
//       this.state.id.x === this.state.roombaLocation.x &&
//        this.state.id.y === this.state.roombaLocation.y
//         ) {
//           console.log(this.state.id, this.state.roombaLocation, "pigs")

//           this.setState({
//             hasRoomba: true,
//             // hadRoomba: true,

//           })
//         }
    
//   }

//   containsDirtPile = () => {
//     this.state.dirtLocations.forEach(el => {
//       if(el[0] - 1 === this.state.id.x 
//         && el[1] - 1 === this.state.id.y
//         && !this.state.hasDirt) {
//         this.setState({
//           hasDirt: true,
//         })
//       }
//     })
//     // this.state.dirtLocations.forEach(el => {
//     //   if(el[0] - 1 === this.state.id.x && el[1] - 1 === this.state.id.y) {
//     //     this.setState({
//     //       hasDirt: true
//     //     })
//     //   }
//     // })
//     // }
//   }



//   render() {
//     this.containsDirtPile()
//     if(this.state.hasRoomba && this.state.hasDirt) {
//       return(
//         <div>
//           <Roomba />
//         </div>
//       )
//     } else if(this.state.hasDirt) {
//       return (
//           <img className="treasureMapSquare" src={dirtSquare} />
        
//       )
//     } else if(this.state.hasRoomba) {
//       return( 
//         <div>
//           <Roomba />
//         </div>
//       )
//     }   else {
//       return (
//         <div className="regularTreasureMapSquare">
//         </div>
//       )
//     }
//   }
// }

export default Square