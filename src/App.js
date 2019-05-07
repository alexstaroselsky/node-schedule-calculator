import React, { Component } from 'react';
import Form from './components/Form';
import ScheduleList from './components/ScheduleList';
import format from './format.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cronExpression: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(cronExpression) {
    this.setState({ cronExpression });
  }

  render() {
    const { cronExpression } = this.state;
    return (
      <div className="App">
        <div className="container">
          <div>
            <h1>
              <code>node-schedule</code> <span>Calculator</span>
            </h1>
          </div>

          <div>
            <img src={format} alt="Supported format" />
          </div>

          <br />

          <div>
            <Form onChange={this.handleChange} />
          </div>

          {cronExpression && (
            <ScheduleList cronExpression={cronExpression} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
