import React from 'react'


class StatBox extends React.Component {
  constructor() {
    super()
    this.state = {
      turnCollection: []
    }
  }

  componentDidMount = () => {
    let turnCollectionArr = [{
      turn: this.props.turnCounter,
      roombaLocation: this.props.roombaLocation,
      action: this.props.actionLog[0],
      totalDirtCollected: this.props.dirtCollected,
      totalWallHits: this.props.bumps
    }]

    this.setState({
      turnCollection: turnCollectionArr
    })
  }
 
  

  render() {

    const dirtLocations = this.props.dirtLocations.map((el, idx) => {
      return (
        <li key={idx}>{JSON.stringify(el)}</li>
      )
    })

    // const dataRows = this.props.forEach(el => {
    //   console.log(el)
    // })

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
          {/* {
            dataRows
          } */}
        </table>
      </div>
    )
  }
}

export default StatBox