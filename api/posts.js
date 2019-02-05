import { get } from 'api'

export const list = () => {
  return get('/api/v1/posts/')
}

export const show = id => {}
