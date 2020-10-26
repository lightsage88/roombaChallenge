import React from 'react';
import ReactDOM from 'react-dom'
import {mount, shallow} from 'enzyme'
import App from './App';


describe("App Component", () => {
  it("renders w/o crashing", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance()
    expect(wrapper.find("h1").text()).toEqual("Roomba Dirt Hunt!")
  })

  it("uses \"componentDidMount\" to set state and call this.autoPilot", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance()
    const autoPilotSpy = jest.spyOn(wrapper.instance(), "autoPilot")
    const waitForPromiseSpy = jest.spyOn(wrapper.instance(), "waitForPromise")
    componentInstance.componentDidMount()
    expect(autoPilotSpy).toHaveBeenCalled()
    setTimeout(() => {
      expect(waitForPromiseSpy).toHaveBeenCalled()
    }, 10000)
  })

  it("running goNorth when too far north calls increaseBump", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance()
    const increaseBumpSpy = jest.spyOn(wrapper.instance(), "increaseBump")
    componentInstance.setState({
      ...componentInstance.state,
      mapMaxY: 1
    })
    componentInstance.componentDidMount()
    componentInstance.goNorth()
    expect(increaseBumpSpy).toHaveBeenCalled()
  })

  it("running goSouth when too far south calls increaseBump", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance()
    const increaseBumpSpy = jest.spyOn(wrapper.instance(), "increaseBump")
    componentInstance.componentDidMount()
    componentInstance.goSouth()
    expect(increaseBumpSpy).toHaveBeenCalled()
  })

  it("running goEast when too far east calls increaseBump", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance()
    const increaseBumpSpy = jest.spyOn(wrapper.instance(), "increaseBump")
    componentInstance.setState({
      ...componentInstance.state,
      mapMaxX: 1
    })
    componentInstance.componentDidMount()
    componentInstance.goEast()
    expect(increaseBumpSpy).toHaveBeenCalled()
  })

  it("running goWest when too far west calls increaseBump", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance()
    const increaseBumpSpy = jest.spyOn(wrapper.instance(), "increaseBump")
    componentInstance.componentDidMount()
    componentInstance.goWest()
    expect(increaseBumpSpy).toHaveBeenCalled()
  })

  it("running any go-Direction method calls increaseMovementCounter, which updates the movementCounter state-item, and calls updateTravelLog, updateActionLog, and checkForDirt", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance() 
    
    const increaseBumpSpy = jest.spyOn(wrapper.instance(), "increaseBump")
    const increaseMovementCounterSpy = jest.spyOn(wrapper.instance(), "increaseMovementCounter")
    const updateTravelLogSpy = jest.spyOn(wrapper.instance(), "updateTravelLog")
    const updateActionLogSpy = jest.spyOn(wrapper.instance(), "updateActionLog")
    const checkForDirtSpy = jest.spyOn(wrapper.instance(), "checkForDirt")

    componentInstance.setState({
      ...componentInstance.state,
      movementCounter: 10
    })

    componentInstance.componentDidMount()
    componentInstance.goNorth()
    expect(increaseBumpSpy).not.toHaveBeenCalled()
    expect(componentInstance.state.movementCounter).toEqual(11)
    expect(updateTravelLogSpy).toHaveBeenCalled()
    expect(updateActionLogSpy).toHaveBeenCalled()
    expect(checkForDirtSpy).toHaveBeenCalled()
  })

  it("running checkForDirt when state.roombaLocation is on a dirtLocation increments state.dirtCollected by one and changes state.foundDirtLocations", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance() 
    componentInstance.setState({
      ...componentInstance.state,
      roombaLocation: [ 3, 3 ],
      dirtLocations: [ [ 3, 3 ] ]
    })
    componentInstance.checkForDirt()
    expect(componentInstance.state.dirtCollected).toEqual(1)
    expect(componentInstance.state.dirtLocations).toEqual([ [3, 3] ])
  })

  it("updateTravelLog increments state.travelLog", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance() 
    const originalTravelLogLength = componentInstance.state.travelLog.length
    componentInstance.setState({
      ...componentInstance.state,
      roombaLocation: [ 1, 2 ]
    })
    componentInstance.updateTravelLog()
    expect(componentInstance.state.travelLog.length > originalTravelLogLength).toBeTruthy()
  })

  it("updateActionLog increments state.actionLog", () => {
    const wrapper = shallow(<App />)
    const componentInstance = wrapper.instance() 
    const originalActionLogLength = componentInstance.state.actionLog.length
    componentInstance.updateActionLog({0: "test"})
    expect(componentInstance.state.actionLog.length > originalActionLogLength)
    expect(componentInstance.state.actionLog[1]).toEqual({0: "test"})
  })
})
