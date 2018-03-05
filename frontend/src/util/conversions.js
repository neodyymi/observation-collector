//'2018-03-02T17:54:07.686415Z'

const utcToLocal = (date) => {
  console.log(date)
  return new Date(Date.parse(date)).toString();
}

const fToC = (fahrenheit) => {
  return ((5/9) * (fahrenheit - 32))
}

const cToF = (celcius) => {
  return (celcius * (9/5) + 32)
}

const tempFormat = (temperature, fromScale, toScale) => {
  if(toScale === 'fahrenheit' && fromScale === 'celcius') {
    return cToF(temperature, fromScale).toFixed(2).toString()
  } 
  if (toScale === 'celcius' && fromScale === 'fahrenheit') {
    return fToC(temperature, fromScale).toFixed(2).toString()
  }
  return temperature
}

module.exports = { utcToLocal, fToC, cToF, tempFormat }
