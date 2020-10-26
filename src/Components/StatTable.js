import React from 'react'


class StatTable extends React.Component {
  constructor() {
    super()
    this.state = {
      turnCollection: []
    }
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.turnCounter !== prevProps.turnCounter) {
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
        <tr className="statTableRow" key={idx}>
          <td>{ el.turn }</td>
          <td>{ el.roombaLocation }</td>
          <td>{ el.action }</td>
          <td>{ el.totalDirtCollected }</td>
          <td>{ el.totalWallHits }</td>
        </tr>
      )
    })


    return (
      <div className="nes-table-responsive">
        <h2>Stat Table</h2>
        <table id="statTable" className="nes-table is-bordered is-centered">
          <thead>
            <tr>
              <th>STEP</th>
              <th>Roomba Location</th>
              <th>Action</th>
              <th>Dirt Collected</th>
              <th>Wall Hits</th>
            </tr>
          </thead>
          <tbody>
            {turnRows}
          </tbody>
          <tfoot>

          </tfoot>
        </table>
      </div>
    )
  }
}

export default StatTable