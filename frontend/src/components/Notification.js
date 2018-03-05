import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null
  }
  if (message !== null) {
    return (
      <div className='notification'>
        {message}
      </div>
    )
  }
  return (
    <div className='error'>
      {error}
    </div>
  )
}

export default Notification