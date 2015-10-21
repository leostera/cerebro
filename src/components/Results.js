import React from 'react';

import UserStore from '../stores/User';

export default React.createClass({

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._onChange);
  },

  getInitialState: function () {
    return {users: []};
  },

  render: function () {
    let body = this.state.users.map(function (user) {
      return <li class="user"> {user.login} - <a href={user.html_url}>github</a></li>;
    });

    return (
      <div>
        <ul>
          {{body}}
        </ul>
      </div>
    );
  },

  _onChange: function () {
    let users = UserStore.getUsers();
    this.setState({ users });
  }

});
