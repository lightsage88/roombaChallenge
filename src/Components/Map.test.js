import React from 'react';
import ReactDOM from 'react-dom'
import {mount, shallow} from 'enzyme'
import Map from './Map';

//TODO: fix printGrid test

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

  // it("calls printGrid upon mounting", () => {
  //   const wrapper = shallow(<Map travelLog={[]}/>)
  //   // const componentInstance = wrapper.instance()
  //   // componentInstance.componentDidMount()
  //   wrapper.update()
  //   const printGridSpy = jest.spyOn(wrapper.instance(), "printGrid")
  //   expect(printGridSpy).toHaveBeenCalled()
  // })

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

  it("hasDirt return false if argument integers are not each one less than the value in the 2d array state item used in method", () => {
    const wrapper = shallow(<Map travelLog={[]}/>)
    const componentInstance = wrapper.instance()
    componentInstance.setState({
      ...componentInstance.state,
      dirtLocations: [ [1,1] ]
    })
    const value = componentInstance.hasDirt(1,1)
    expect(value).toEqual(false)
  })

  it("hasRoomba returns true if argument integers are one less than the state.roombaLocation item", () => {
    const wrapper = shallow(<Map travelLog={[]}/>)
    const componentInstance = wrapper.instance()
    componentInstance.setState({
      ...componentInstance.state,
      roombaLocation: [ 2, 2 ]
    })
    const value = componentInstance.hasRoomba(1,1)
    expect(value).toEqual(true)
  })

  it("hasRoomba returns false if argument integers are not one less than the state.roombaLocation item", () => {
    const wrapper = shallow(<Map travelLog={[]}/>)
    const componentInstance = wrapper.instance()
    componentInstance.setState({
      ...componentInstance.state,
      roombaLocation: [ 2, 2 ]
    })
    const value = componentInstance.hasRoomba(2,2)
    expect(value).toEqual(false)
  })

  it("previouslyHadRoomba returns true if argument integers are one less than a given entry in the state.travelLog 2D array item", () => {
    const wrapper = shallow(<Map travelLog={["1,1", "1,2", "2,2"]}/>)
    const componentInstance = wrapper.instance()
    componentInstance.setState({
      ...componentInstance.state,
      travelLog: ["1,1", "1,2", "2,2"]
    })
    componentInstance.componentDidMount()
    componentInstance.convertTravelLogEntries(componentInstance.state.travelLog)
    const value = componentInstance.previouslyHadRoomba(0,0)
    expect(value).toEqual(true)
  })

  it("previouslyHadRoomba returns false if argument integers are NOT one less than a given entry in the state.travelLog 2D array item", () => {
    const wrapper = shallow(<Map travelLog={["1,1", "1,2", "2,2"]}/>)
    const componentInstance = wrapper.instance()
    componentInstance.setState({
      ...componentInstance.state,
      travelLog: ["1,1", "1,2", "2,2"]
    })
    componentInstance.componentDidMount()
    componentInstance.convertTravelLogEntries(componentInstance.state.travelLog)
    const value = componentInstance.previouslyHadRoomba(10,9)
    expect(value).toEqual(false)
  })
})

