import React, { Component } from 'react';
import { Api } from './api.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new Api(),
      members: []
    };
    this.loggedIn = this.loggedIn.bind(this)
  }
  loggedIn() {
    this.state.api.getMembers()
      .then((members) => {
        this.setState({
          members: members
        })
      })
  }
  render() {
    return (
      <div className="App">
        <LoginForm
          api={this.state.api}
          loggedIn={this.loggedIn}></LoginForm>
        <MemberList
          api={this.state.api}
          members={this.state.members}>
        </MemberList>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.api.login(this.state.user, this.state.pass)
      .then(() => {
        this.props.loggedIn()
        this.props.shown = true;
      })
  }
  handleUserChange(event) {
    this.setState({ user: event.target.value });
  }
  handlePassChange(event) {
    this.setState({ pass: event.target.value });
  }
  render() {
    return this.props.shown ? (
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={this.state.user}
              onChange={this.handleUserChange}
              placeholder="username">
            </input>
          </div>
          <div>
            <input
              type="password"
              value={this.state.pass}
              onChange={this.handlePassChange}
              placeholder="password" >
            </input>
          </div>
          <div>
            <input type="submit" value="Submit"></input>
          </div>
        </form>
      </div>
    ) : null;
  }
}

class MemberList extends Component {
  renderMembers(member) {
    return (
      <MemberEntry member={member} key={member.id}></MemberEntry>
    )
  }
  filterMembers(m) {
    return m.registered
  }
  render() {
    return (
      <div>
        {this.props.members.filter(this.filterMembers).map(this.renderMembers)}
      </div>
    );
  }
}

class MemberEntry extends Component {
  render() {
    return (
      <div>
        {this.props.member.firstName}
      </div>
    )
  }
}

export default App;
