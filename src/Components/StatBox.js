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
      console.log(this.props)
      console.log(typeof(this.props.roombaLocation))
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
      <div>
        <h1>Stat Box</h1>
        <p>Total Movements: {this.props.movementCounter}</p>
        <p>Dirt Collected: {this.props.dirtCollected}</p>

        <p>Dirt Locations:</p>
        <ul>
          {dirtLocations}
        </ul>
        <p>Bumps: {this.props.bumps}</p>
        <table>
          <tr>
            <th>STEP</th>
            <th>Roomba Location</th>
            <th>ACTION</th>
            <th>Total Dirt Collected</th>
            <th>Total Wall Hits</th>
          </tr>
          {turnRows}
        </table>
      </div>
    )
  }
}

export default StatBox