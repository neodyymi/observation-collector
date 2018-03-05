import React from 'react'

const SelectTempScale = ({ showTempScale, handleChange }) => (
  <select value={ showTempScale } name="showTempScale" id="showTempScale" onChange={ handleChange }>
    <option value="celcius" >&deg;C</option>
    <option value="fahrenheit" >&deg;F</option>
  </select>
)

export default SelectTempScale