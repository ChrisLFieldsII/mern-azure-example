import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: [],
    };
  }

  componentDidMount() {
    axios
      .get('/api/thoughts/')
      .then(res => this.setState({ thoughts: res.data }))
      .catch(alert);
  }

  render() {
    const { thoughts } = this.state;

    return (
      <div className="App">
        {/* Buttons to interact with API */}
        <button onClick={this.createThought}>Create Thought</button>
        <button onClick={this.deleteThoughts}>Delete Thoughts</button>
        <button onClick={this.seedThoughts}>Seed Thoughts</button>
        {/* List of thoughts in Cosmos DB */}
        <ul>
          {thoughts.map(thoughtModel => (
            <li
              style={{ listStyleType: 'none', margin: '20px', borderBottom: '1px solid black' }}
              key={thoughtModel._id}
            >
              {thoughtModel.thought}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  createThought = () => {
    const thought = prompt('Enter your thought: ');
    if (!thought) return;
    axios
      .post('/api/thoughts/create', { thought })
      .then(res => this.setState({ thoughts: [...this.state.thoughts, res.data.newThought] }))
      .catch(err => alert(`Failed to create thought\n${JSON.stringify(err)}`));
  };

  deleteThoughts = () => {
    const doDelete = window.confirm('Delete all Thoughts?');
    if (!doDelete) return;
    axios
      .delete('/api/thoughts/')
      .then(res => this.setState({ thoughts: [] }))
      .catch(err => alert(`Failed to delete all thoughts\n${JSON.stringify(err)}`));
  };

  seedThoughts = () => {
    const doSeed = window.confirm('Do you want to seed random data?');
    if (!doSeed) return;
    axios
      .post('/api/thoughts/seed', {})
      .then(() => {
        axios
          .get('/api/thoughts/')
          .then(res => this.setState({ thoughts: res.data }))
          .catch(alert);
      })
      .catch(alert);
  };
}

export default App;
