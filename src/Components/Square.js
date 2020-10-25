import React from 'react'

function Square(props) {
  let classPick = "dirtSquare"
  if(props.hasDirt) {
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