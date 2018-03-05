import React from 'react'
import Observation from './Observation'

class Location extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      observationsVisible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ observationsVisible: !this.state.observationsVisible })
  }

  average = (observations) => {
    if (observations.length < 1) {
      return 'N/A'
    } else {
      return (observations.reduce((a,b) => (a+parseFloat(b.temperature)),0)/observations.length).toFixed(2)
    }
  }

  max = (observations) => {
    observations = observations.filter(o=>(o.timestamp > new Date().getTime() - (1000*60*60*24)))
    if (observations.length < 1) {
      return null
    } else {
      return observations.reduce((a,b) => (
        parseFloat(a.temperature) > parseFloat(b.temperature) ? a : b
      ), {temperature: -999})
      
    }
  }

  min = (observations) => {
    observations = observations.filter(o=>(o.timestamp > new Date().getTime() - (1000*60*60*24)))
    if (observations.length < 1) {
      return null
    } else {
      return (observations.reduce((a,b) => (
        parseFloat(a.temperature) < parseFloat(b.temperature) ? a : b
      ), {temperature: 999})
      )
    }
  }
  render() {
    const observations = this.props.location.observations
    const locationMax = this.max(observations)
    const locationMin = this.min(observations)
    const scaleString = (this.props.showTempScale === 'fahrenheit'?'°F':'°C')
    return(
      <div>
        <div className="border center">
          <table className="center">
            <tbody>
              <tr>
                <td>Location</td>
                <th>{ this.props.location.name }</th>
              </tr><tr>
                <td>Coordinates</td>
                <td>({ this.props.location.xCoord }, { this.props.location.yCoord })</td>
              </tr><tr>
                <td>Observations</td>
                <td>{ observations.length }</td>
              </tr><tr title={ observations.length < 1 ? "N/A" : observations[0].id + scaleString }>
                <td>Latest</td>
                <td>{ observations.length < 1 ? "N/A" : observations[0].temperature + scaleString }</td>
              </tr><tr title={locationMax === null ? "N/A" : locationMax.timestamp }>
                <td>Max(24h)</td>
                <td>{ locationMax === null ? "N/A" : locationMax.temperature + scaleString }
                </td>
              </tr><tr title={ locationMin === null ? "N/A" : locationMin.timestamp }>
                <td>Min(24h)</td>
                <td>{ locationMin === null ? "N/A" : locationMin.temperature + scaleString }</td>
              </tr><tr>
                <td>Average(24h)</td>
                <td>{ observations.length < 1 ? "N/A" : this.average(observations) + scaleString }</td>
              </tr>
            </tbody>
          </table>

          <button onClick={ this.toggleVisibility }>Show observations</button>
          <button onClick={ this.props.addfunc(this.props.location) }>Add observation</button>
          <div className={ this.state.observationsVisible ? '' : 'hidden' }>
            {observations.map(observation => (
              <Observation key={ observation.id } scaleString={ scaleString } observation={ observation } delfunc={ this.props.delfunc } />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Location