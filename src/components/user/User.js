import React, { Component } from 'react';
import MyList from './MyList';
import { connect } from 'react-redux';
import { addList } from './actions';

class User extends Component {

  state = {
    list: ''
  };


  handleSubmit = event => {
    event.preventDefault();
    const { list } = this.state;
    this.props.addList(list);
    this.setState({
      list: ''
    });
    console.log(list);
  };

  handleChange = ({ target }) => {
    this.setState({ list: target.value });
  };

  render() {
    const { list } = this.state;
    const { user } = this.props;
    

    return (
      <section className="main-container maxwidth-wrap">

        {user && <h4>Hello, {user.name}</h4>}

        <form onSubmit={this.handleSubmit}>
          <legend>Create List</legend>
          <label htmlFor="listTitle">
            <input id="listTitle" name={list} onChange={this.handleChange}/>
          </label>
          <button>Create List</button>
        </form>

        <MyList/>
      </section>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { addList }
)(User);