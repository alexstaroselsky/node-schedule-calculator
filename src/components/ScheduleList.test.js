import React from 'react';
import { shallow } from 'enzyme';
import { parseExpression } from 'cron-parser';
import ScheduleList from './ScheduleList';

describe('ScheduleList', () => {
  it('renders without crashing', () => {
    const cronExpression = parseExpression('*/2 * * * *');
    shallow(<ScheduleList cronExpression={cronExpression} />);
  });

  it('should render four (4) ScheduleListItem', () => {
    const cronExpression = parseExpression('*/2 * * * *');
    const wrapper = shallow(<ScheduleList cronExpression={cronExpression} />);

    expect(wrapper).toContainMatchingElements(4, 'ScheduleListItem');
  });
});