import React from 'react';
import { Calendar as AntCalendar, Badge } from 'antd';
import { Schema } from '../../amplify/data/resource';
import moment from 'moment';

interface CalendarProps {
  tasks: Schema['Task'][];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const dateCellRender = (value: moment.Moment) => {
    const listData = tasks.filter(task => 
      moment(task.createdAt).isSame(value, 'day')
    );

    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.id}>
            <Badge status={item.status === 'COMPLETED' ? 'success' : 'processing'} text={item.description} />
          </li>
        ))}
      </ul>
    );
  };

  return <AntCalendar dateCellRender={dateCellRender} />;
};

export default Calendar;