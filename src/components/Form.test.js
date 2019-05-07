import React from 'react';
import { shallow } from 'enzyme';
import { parseExpression } from 'cron-parser';
import Form from './Form';

describe('Form', () => {
  it('renders without crashing', () => {
    const mockOnChange = jest.fn();
    shallow(<Form onChange={mockOnChange} />);
  });

  it('should render an error message', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<Form onChange={mockOnChange} />);

    wrapper.setState({ errorMessage: 'foo' });

    expect(wrapper.find('.form-group').at(0)).toHaveClassName('has-error');
    expect(wrapper.find('.form-control-error').at(0)).toHaveText('foo');
  });

  it('should add "has-error" class to div.form-group', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<Form onChange={mockOnChange} />);

    wrapper.setState({ errorMessage: 'foo' });

    expect(wrapper.find('.form-group').at(0)).toHaveClassName('has-error');
  });

  it('should render cron expression description', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<Form onChange={mockOnChange} />);

    wrapper.setState({ description: 'foo' });

    expect(wrapper.find('.description').at(0)).toHaveText('foo');
  });

  it('should set error message state for invalid cron expression', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<Form onChange={mockOnChange} />);

    wrapper.find('input').at(0).simulate('change', { target: { value: 'foo' } });

    expect(wrapper).toHaveState('errorMessage', 'Error: Invalid characters, got value: undefined');
  });

  it('should remove description after invalid cron expression entered', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<Form onChange={mockOnChange} />);

    wrapper.setState({ description: 'foo' });

    wrapper.find('input').at(0).simulate('change', { target: { value: 'foo' } });

    expect(wrapper).toHaveState('description', null);
  });

  it('should render description for valid cron expression', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<Form onChange={mockOnChange} />);

    wrapper.find('input').at(0).simulate('change', { target: { value: '* */2 * * *' } });

    expect(wrapper).toHaveState('description', 'Every minute, every 2 hours');
  });

  it('should call props onChange for valid cron expression', () => {
    const mockOnChange = jest.fn();

    const wrapper = shallow(<Form onChange={mockOnChange} />);

    wrapper.find('input').at(0).simulate('change', { target: { value: '* */2 * * *' } });

    expect(mockOnChange).toBeCalled();
  });

  it('should remove error message for valid cron expression', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<Form onChange={mockOnChange} />);

    wrapper.setState({ errorMessage: 'foo' });

    wrapper.find('input').at(0).simulate('change', { target: { value: '* */2 * * *' } });

    expect(wrapper).toHaveState({ errorMessage:null });
    expect(wrapper).not.toContainMatchingElement('.form-control-error');
  });
});