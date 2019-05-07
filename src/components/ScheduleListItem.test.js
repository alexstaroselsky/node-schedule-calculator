import React from 'react';
import { shallow } from 'enzyme';
import dateFormat from 'dateformat';
import { parseExpression } from 'cron-parser';
import ScheduleListItem from './ScheduleListItem';

const DATE_FORMAT = 'dddd, mmmm dS, yyyy, h:MM:ss TT Z';

describe('ScheduleListItem', () => {
  it('renders without crashing', () => {
    const cronDate = parseExpression('*/2 * * * *').next();
    shallow(<ScheduleListItem cronDate={cronDate} />);
  });
  
  it('formats the date', () => {
    const cronDate = parseExpression('*/2 * * * *').next();
    const formattedDate = dateFormat(cronDate.toDate(), DATE_FORMAT);
    const wrapper = shallow(<ScheduleListItem cronDate={cronDate} />);
  
    expect(wrapper).toIncludeText(formattedDate);
  });
});
