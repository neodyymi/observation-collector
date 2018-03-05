import React from 'react'

const LocationForm = ({ onSubmit, handleChange, newLocationName, newLocationXCoord, newLocationYCoord }) => {
  return (
    <div id="locationForm">
      <h4>Add location</h4>

      <form onSubmit={onSubmit}>
        <input
          autoFocus
          placeholder="Name"
          type="text"
          id="newLocationName"
          name="newLocationName"
          value={ newLocationName }
          onChange={ handleChange }
        />
        <input
          autoFocus
          placeholder="x-coordinate"
          type="text"
          id="newLocationXCoord"
          name="newLocationXCoord"
          value={ newLocationXCoord }
          onChange={ handleChange }
        />
        <input
          autoFocus
          placeholder="y-coordinate"
          type="text"
          id="newLocationYCoord"
          name="newLocationYCoord"
          value={ newLocationYCoord }
          onChange={ handleChange }
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default LocationForm