import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import ScheduleListItem from './ScheduleListItem';
import './ScheduleList.css';

const NUMBER_OF_ITEMS = 4;

function getCronDates(schedule) {
  let cronDates = [];

  for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
    const cronDate = { id: uuid(), date: schedule.next() };
    cronDates.push(cronDate);
  }

  return cronDates;
}

class ScheduleList extends Component {
  render() {
    const cronDates = getCronDates(this.props.cronExpression);

    return (
      <div>
        <div />
        <div>
          <strong>Upcoming executions:</strong>
        </div>
        <ul className="schedule-list">
          {cronDates.map(cronDate => (
            <ScheduleListItem
              key={cronDate.id}
              cronDate={cronDate.date}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ScheduleList.propTypes = {
  cronExpression: PropTypes.object.isRequired
};

export default ScheduleList;
