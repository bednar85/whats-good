export const ADD_ARTICLE = "ADD_ARTICLE";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
};

export const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  return state;
}

export default rootReducer;