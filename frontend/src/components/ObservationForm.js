import React from 'react'

const ObservationForm = ({ onSubmit, handleChange, newObservationTemp, temperatureScale, locations, location }) => {
  return (
    <div id="observationForm">
      <h4>Add observation</h4>

      <form onSubmit={onSubmit}>
        <select
          id="location"
          name="location"
          onChange={ handleChange }
          value={ location }
        >
        { locations !== undefined ? locations.map(l => <option key={l.id} value={l.id} >{l.name}</option>):''}
        </select>
        <input
          autoFocus
          placeholder="Temperature"
          type="number"
          step="0.01"
          id="newObservationTemp"
          name="newObservationTemp"
          value={ newObservationTemp }
          onChange={ handleChange }
        />
        <select 
          id="temperatureScale"
          name="temperatureScale"
          onChange={ handleChange }
          value={ temperatureScale }
        >
        <option value="celcius" >&deg;C</option>
        <option value="fahrenheit">&deg;F</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default ObservationForm