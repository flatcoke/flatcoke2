import { actionTypes } from 'actions/posts'

const initialState = {
  items: [],
  next: null,
  previous: null,
  readPostsError: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.READ_POST_PENDING:
      return {
        ...state,
      }

    case actionTypes.READ_POST_SUCCEEDED:
      return {
        ...state,
        items : action.data.results,
        next: action.data.next,
        previous: action.data.previous,
        readPostsError: null,
      }
    default:
      return state
  }
}

export default reducer
