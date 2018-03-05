import React from 'react'

const Observation = ({ observation, delfunc, scaleString }) => {
  return(
    <div title={ observation.id } className="border inline">
        { observation.timestamp.toString() }<br />
        { observation.temperature }{ scaleString }<br />
        <button onClick={ delfunc(observation) }>Delete</button>
    </div>
  )
}

export default Observation