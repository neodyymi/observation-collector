import React from 'react';
import observationService from './services/observations'
import locationService from './services/locations'
import Location from './components/Location'
import Togglable from './components/Togglable';
import ObservationForm from './components/ObservationForm'
import SelectTempScale from './components/SelectTempScale';
import Notification from './components/Notification'
import { tempFormat } from './util/conversions'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      observations: [],
      locations: [],
      test: [],
      location: '',
      newLocation: '',
      newObservationTemp: '',
      temperatureScale: 'celcius',
      notification: null,
      error: null,
      showTempScale: 'celcius'
    }
  }

  async componentWillMount() {
    console.log('will mount')
    let observations = []
    let locations = []
    try {
      observations = await observationService.getAll()

      observations = observations.map(a => {
        a.timestamp = new Date(a.timestamp)
        return a
      })
    } catch(e) {
      console.log(e)
    }
    try {
      locations = await locationService.getAll()
    } catch(e) {
      console.log(e)
    }    
    this.setState({
      observations: observations,
      locations: locations })
  }

  addObservation = async (event) => {
    event.preventDefault()
    const observationObject = {
      temperature: this.state.newObservationTemp,
      locationId: event.target.location.value,
      temperatureScale: this.state.temperatureScale
    }
    
    const newObservation = await observationService.create(observationObject)
    newObservation.Item.timestamp = new Date(newObservation.Item.timestamp)

    this.setState({
      observations: this.state.observations.concat(newObservation.Item),
      newObservationTemp: '',
      notification: `Added observation.`
    })

    this.observationForm.toggleVisibility()
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  addObservationLocation = (location) => {
    return () => {
      this.setState({
        location: location.id
      })
      this.observationForm.setVisible()
      setTimeout(() => {
        document.getElementById("observationForm").scrollIntoView()
      }, 100)
    }
  }
  deleteObservation = (observation) => {
    return async () => {
      if(window.confirm(`Do you want to delete ${observation.timestamp}?`)) {
        try{
          await observationService.del(observation.id)
          this.setState({
            observations: this.state.observations.filter(o => o.id !== observation.id),
            notification: `Removed ${observation.id} ${observation.timestamp}`
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
        } catch(e) {
          console.log(e)
          this.setState({
            observations: this.state.observations.filter(o => o.id !== observation.id)
          })
        }
      }
    }
  }

  handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  changeTempScale = (event) => {
    const observations = this.state.observations.map(o => {
      o.temperature = tempFormat(o.temperature, o.temperatureScale, event.target.value)
      o.temperatureScale = event.target.value
      return o
    })
    this.setState({
      observations: observations,
      showTempScale: event.target.value
    })
  }

  render() {
    const locations = this.state.locations.map(location => {
      const modifiedLocation = location
      modifiedLocation.observations = this.state.observations.filter(observation => 
        observation.locationId === location.id
      ).sort((a, b) => (a.timestamp>b.timestamp ? -1 : a.timestamp<b.timestamp ? 1 : 0))
      return modifiedLocation
    })
    return (
      <div className="App">
        <Notification error={this.state.error} message={this.state.notification} />
        <SelectTempScale showTempScale={this.state.showTempScale} handleChange={this.changeTempScale} />
        <Togglable buttonLabel="New observation" 
          ref={ component => this.observationForm = component } >
            <ObservationForm 
              onSubmit={ this.addObservation } 
              handleChange={ this.handleChange } 
              newObservationTemp={ this.state.newObservationTemp }
              temperatureScale={ this.state.temperatureScale }
              locations={ this.state.locations }
              location={ this.state.location }
            />
          </Togglable>
        {locations.map(location => (
          <Location 
            key={ location.id } 
            location={ location } 
            addfunc={ this.addObservationLocation } 
            delfunc={ this.deleteObservation }
            showTempScale={ this.state.showTempScale } />
        ))}
        
      </div>
    );
  }
}

export default App;
