import React from 'react'

function Square(props) {
  console.log('SQUARE', props)
  let classPick = "dirtSquare"
  if (props.hasDirt && props.hadRoomba) {
    classPick = "dugSquare"
  } else if (props.hasDirt && props.hasRoomba) {
    classPick = "generalRoombaSquare roombaSquare"
  } else if(props.hasDirt) {
    classPick = "dirtSquare"
  } else if(props.hasRoomba) {
    classPick = "generalRoombaSquare roombaSquare"
  } else if (props.hadRoomba) {
    classPick = "fireSquare"
  } else {
    classPick = "regularTreasureMapSquare"
  }
  
  return (
    <div className={"generalSquare " + classPick}></div>
  )
}

export default Square