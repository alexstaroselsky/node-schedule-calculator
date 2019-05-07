import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cronstrue from 'cronstrue';
import classNames from 'classnames';
import { parseExpression } from 'cron-parser';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: '',
      description: null,
      hasError: false,
      errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value: expression } = e.target;

    // reset output
    this.props.onChange(null);
    this.setState({ expression });

    try {
      const cronExpression = parseExpression(expression);
      const description = cronstrue.toString(expression);

      this.props.onChange(cronExpression);
      this.setState({ errorMessage: null, description });
    } catch (error) {
      const errorMessage = error.toString();
      this.setState({ description: null, errorMessage });
    }
  }

  render() {
    const { description, errorMessage, schedule } = this.state;
    return (
      <form className="form">
        <div
          className={classNames('form-group', {
            'has-error': !!errorMessage
          })}
        >
          <label className="sr-only" htmlFor="expression">
            Expression
          </label>
          <input
            type="text"
            id="expression"
            name="expression"
            className="form-control form-control-lg"
            value={schedule}
            onChange={this.handleChange}
            autoComplete="false"
            placeholder="Enter expression"
            required
          />
          {errorMessage && (
            <div className="form-control-error">{errorMessage}</div>
          )}
        </div>
        {description && <div className="description">{description}</div>}
      </form>
    );
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Form;
