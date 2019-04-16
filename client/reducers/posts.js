import { actionTypes } from 'actions/posts'

const initialState = {
  items: [],
  post: null,
  next: null,
  previous: null,
  readPostsError: null,
  readPostError: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.READ_POST_LIST_PENDING:
      return {
        ...state,
      }

    case actionTypes.READ_POST_LIST_SUCCEEDED:
      return {
        ...state,
        items: action.data,
        // next: action.data.next,
        // previous: action.data.previous,
        readPostsError: null,
      }

    case actionTypes.READ_POST_PENDING:
      return {
        ...state,
      }

    case actionTypes.READ_POST_SUCCEEDED:
      return {
        ...state,
        post: action.data,
        readPostError: null,
      }
    default:
      return state
  }
}

export default reducer
