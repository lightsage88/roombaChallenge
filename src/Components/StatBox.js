import React from 'react'


class StatBox extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {

    if (props.data !== state.data) {
      return {
        data: props.data,
        // dirtCounter: props.data.dirtCollected,
        // bumpCounter: props.data.bumpCounter
      };
    }
    return null;
  }
 

  render() {
    return (
      <div>
        <h1>Stat Box</h1>
        <p>Total Movements: {this.state.data.movementCounter}</p>
        <p>Dirt Collected: {this.state.data.dirtCollected}</p>

        <p>Dirt Locations: {
          this.state.data.dirtLocations
          }
        </p>
        <p>Bumps: {this.state.data.bumpCounter}</p>
      </div>
    )
  }
}

export default StatBox