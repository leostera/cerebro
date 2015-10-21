import Dispatcher from '../dispatchers/Main';

const ActionTypes = {
  USER_SEARCH: Symbol("USER_SEARCH")
};

let User = {

  search: (query) => {
    Dispatcher.dispatch({
      type: ActionTypes.USER_SEARCH,
      query: query
    });
  },

};

export { ActionTypes, User };
