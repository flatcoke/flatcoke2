import { list, show } from 'api/posts'

export const actionTypes = {
  // Update resources, metadata, and lists synchronously
  UPDATE_POST: 'UPDATE_RESOURCES',
  // Remove resources from the store synchronously
  DELETE_POST: 'DELETE_RESOURCES',

  // The following action types are to support CRUD'ing resources
  // asynchronously using requests
  CREATE_POST_PENDING: 'CREATE_POST_PENDING',
  CREATE_POST_FAILED: 'CREATE_POST_FAILED',
  CREATE_POST_SUCCEEDED: 'CREATE_POST_SUCCEEDED',
  CREATE_POST_IDLE: 'CREATE_POST_IDLE',

  READ_POST_LIST_PENDING: 'READ_POST_LIST_PENDING',
  READ_POST_LIST_FAILED: 'READ_POST_LIST_FAILED',
  READ_POST_LIST_SUCCEEDED: 'READ_POST_LIST_SUCCEEDED',
  READ_POST_LIST_IDLE: 'READ_POST_LIST_IDLE',

  READ_POST_PENDING: 'READ_POST_PENDING',
  READ_POST_FAILED: 'READ_POST_FAILED',
  READ_POST_SUCCEEDED: 'READ_POST_SUCCEEDED',
  READ_POST_IDLE: 'READ_POST_IDLE',

  UPDATE_POST_PENDING: 'UPDATE_POST_PENDING',
  UPDATE_POST_FAILED: 'UPDATE_POST_FAILED',
  UPDATE_POST_SUCCEEDED: 'UPDATE_POST_SUCCEEDED',
  UPDATE_POST_IDLE: 'UPDATE_POST_IDLE',

  DELETE_POST_PENDING: 'DELETE_POST_PENDING',
  DELETE_POST_FAILED: 'DELETE_POST_FAILED',
  DELETE_POST_SUCCEEDED: 'DELETE_POST_SUCCEEDED',
  DELETE_POST_IDLE: 'DELETE_POST_IDLE',
}

export const getPosts = () => {
  return async dispatch => {
    dispatch({ type: actionTypes.READ_POST_LIST_PENDING })
    try {
      const result = await list()
      return dispatch({
        type: actionTypes.READ_POST_LIST_SUCCEEDED,
        data: result.data,
      })
    } catch (error) {
      return dispatch({ type: actionTypes.READ_POST_LIST_FAILED }, error)
    }
  }
}

export const getPost = (id) => {
  return async dispatch => {
    dispatch({ type: actionTypes.READ_POST_PENDING })
    try {
      const result = await show(id)
      return dispatch({
        type: actionTypes.READ_POST_SUCCEEDED,
        data: result.data,
      })
    } catch (error) {
      return dispatch({ type: actionTypes.READ_POST_FAILED }, error)
    }
  }
}