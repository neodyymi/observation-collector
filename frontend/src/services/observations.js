import axios from 'axios'

const baseUrl = 'https://7jh42r9fj0.execute-api.eu-west-1.amazonaws.com/beta/observation'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const postObject = {Item: newObject}
  const response = await axios.post(baseUrl, postObject)
  return response.data
}

const del = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, del }
