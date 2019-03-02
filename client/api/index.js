import axios from 'axios'

const API_HOST = process.env.API_HOST || 'http://localhost:3000'

const getURL = endpoint => API_HOST + endpoint

export const post = (endpoint, data) => {
  return axios.post(getURL(endpoint), data)
}

export const get = endpoint => {
  return axios.get(getURL(endpoint))
}

export const patch = (endpoint, data) => {
  return axios.patch(getURL(endpoint), data)
}

export const put = (endpoint, data) => {
  return axios.put(getURL(endpoint), data)
}

export const del = endpoint => {
  return axios.delete(getURL(endpoint) + endpoint)
}
