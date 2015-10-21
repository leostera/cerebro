import EventEmitter from 'events';
import assign from 'object-assign';
import co from 'co';
import request from 'axios';

import Dispatcher from '../dispatchers/Main';
import { ActionTypes } from '../actions/User';

// Internal data structure for users
const SEARCH_URL = "https://api.github.com/search/users";
let _users = [];

let UserStore = assign( {}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit("change");
  },

  addChangeListener: function(callback) {
    this.on("change", callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener("change", callback);
  },

  getUsers: function () { return _users; }

});

UserStore.dispatchToken = Dispatcher.register(function (payload) {
  switch(payload.type) {

    case ActionTypes.USER_SEARCH:
      co(function *getIndex() {
        let requestOptions = {
          method: 'GET',
          url: [SEARCH_URL,'?q=',payload.query].join(''),
          withCredentials: false
        };
        let res = yield request(requestOptions);
        return res.data.items;
      }).then( users => {
        _users = users;
        UserStore.emitChange();
      });
    break;

    default:
      // no-op
  };
});

let mapUsers = function (users) {
  users.map( user => {
    co(function *what() {
      let requestOptions = {
        method: 'GET',
        url: [SEARCH_URL, user.login].join('/'),
        withCredentials: false
      };
      let details = yield request(requestOptions);
      return details;
    });
  }).then( res => { console.log(res); },
           err => { console.log(err); });
};

export default UserStore;
