import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import './ScheduleListItem.css';

class ScheduleListItem extends PureComponent {
  render() {
    const { cronDate } = this.props;
    const date = cronDate.toDate();
    const formattedDate = dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT Z');

    return (
      <li className="schedule-list-item">
        <div className="schedule-list-item-wrapper">{formattedDate}</div>
      </li>
    );
  }
}

ScheduleListItem.propTypes = {
  cronDate: PropTypes.object.isRequired
};

export default ScheduleListItem;
