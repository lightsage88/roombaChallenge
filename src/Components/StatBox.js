import React from 'react'


class StatBox extends React.Component {
  constructor() {
    super()
    this.state = {
      turnCollection: []
    }
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.turnCounter != prevProps.turnCounter) {
    let arr = this.state.turnCollection
    const rL = this.props.roombaLocation

    let turnCollectionObject = {
      turn: this.props.turnCounter,
      roombaLocation: rL,
      action: this.props.actionLog[this.props.actionLog.length - 1],
      totalDirtCollected: this.props.dirtCollected,
      totalWallHits: this.props.bumps
    }
    arr.push(turnCollectionObject)

    this.setState({ turnCollection: arr })
    }
  }
 
  

  render() {

    const turnRows = this.state.turnCollection.map((el, idx) => {
      return(
        <tr>
          <td>{ el.turn }</td>
          <td>{ el.roombaLocation }</td>
          <td>{ el.action }</td>
          <td>{ el.totalDirtCollected }</td>
          <td>{ el.totalWallHits }</td>
        </tr>
      )
    })

    const dirtLocations = this.props.dirtLocations.map((el, idx) => {
      return (
        <li key={idx}>{JSON.stringify(el)}</li>
      )
    })

    return (
      <div id="statBoxDiv">
        <h1>Stat Box</h1>
        <p>Total Movements: {this.props.movementCounter}</p>
        <p>Dirt Collected: {this.props.dirtCollected}</p>

        <ul id="dirtLocationsUL">
        <p>Dirt Locations:</p>
          {dirtLocations}
        </ul>
        <p>Bumps: {this.props.bumps}</p>
      </div>
    )
  }
}

export default StatBox