import React from 'react';

import { User } from '../actions/User';
import UserStore from '../stores/User';

const ENTER_KEY_CODE = 13;

export default React.createClass({

  componentWillMount: function () {
    //User.loadIndex();
  },

  getInitialState: function () {
    return {query: ''};
  },

  render: function () {
    return (
      <div>
        <span>Cerebrum &gt; </span>
        <input placeholder='query'
          autofocus
          autocomplete="off"
          onChange={this._handleChange}
          onKeyDown={this._handleEnter}
        />
      </div>
    );
  },

  _handleChange: function (event) {
    this.setState({query: event.target.value});
  },

  _handleEnter: function (event) {
    const query = this.state.query.trim();
    if (event.keyCode === ENTER_KEY_CODE && query) {
      event.preventDefault();
      User.search(query);
      this.setState({query: ''});
    }
  }

});
