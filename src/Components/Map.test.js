import React from 'react';
import ReactDOM from 'react-dom'
import {mount, shallow} from 'enzyme'
import Map from './Map';

describe("Map Component", () => {
  it("renders w/o crashing", () => {
   shallow(<Map travelLog={[]}/>)
  })

  it("uses \"componentDidMount\" to set state and call this.convertTravelLogEntries", () => {
    const wrapper = shallow(<Map travelLog={[]}/>)
    const componentInstance = wrapper.instance()
    const convertTravelLogEntriesSpy = jest.spyOn(wrapper.instance(), "convertTravelLogEntries")
    componentInstance.componentDidMount()
    expect(convertTravelLogEntriesSpy).toHaveBeenCalled()
  })

  it("convertTravelLogEntries changes string array to a 2D int array and changes Map.state", () => {
    const wrapper = shallow(<Map travelLog={["1,1"]}/>)
    const componentInstance = wrapper.instance()
    componentInstance.convertTravelLogEntries(["1,1"])
    expect(componentInstance.state.travelLog).toEqual([[1,1]])
    expect(componentInstance.state.travelLogRunning).toEqual(false)
  })

  it("hasDirt returns a true if argument integers are each one less than the value in the 2d array state item used in method", () => {
    const wrapper = shallow(<Map travelLog={[]}/>)
    const componentInstance = wrapper.instance()
    componentInstance.setState({
      ...componentInstance.state,
      dirtLocations: [ [2,2] ]
    })
    const value = componentInstance.hasDirt(1,1)
    expect(value).toEqual(true)
  })

  it("hasDirt returns a false if argument integers are not each one less than the value in the 2d array state item used in method", () => {
    const wrapper = shallow(<Map travelLog={[]}/>)
    const componentInstance = wrapper.instance()
    componentInstance.setState({
      ...componentInstance.state,
      dirtLocations: [ [1,1] ]
    })
    const value = componentInstance.hasDirt(1,1)
    expect(value).toEqual(false)
  })

  //todo printgrid
  //todo hasroomba
  //todo previously had roomba

})

