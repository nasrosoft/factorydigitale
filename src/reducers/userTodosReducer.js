export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USER_TODOS':
      return [...action.payload];
    case 'UPDATE_TODO':
      return [...action.payload];
    case 'SET_SORTED_TODOS':
      return [...action.payload];
    case 'DELETE_TODO':
      return [...action.payload];
    case 'POST_TODO':
      return [...state, action.payload];
    default:
      return state;
  }
};
