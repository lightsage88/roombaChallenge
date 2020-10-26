import React from 'react'

function StatBox(props) {
    const dirtLocations = props.dirtLocations.map((el, idx) => {
      return (
        <li key={idx}>{JSON.stringify(el)}</li>
      )
    })

    return (
      <div id="statBoxDiv">
        <h1>Stat Box</h1>
        <p>Current Location: {props.roombaLocation}</p>
        <p>Total Movements: {props.movementCounter}</p>
        <p>Dirt Collected: {props.dirtCollected}</p>
        <ul id="dirtLocationsUL">
          <p>Dirt Locations:</p>
          {dirtLocations}
        </ul>
        <p>Bumps: {props.bumps}</p>
      </div>
    )
}

export default StatBox