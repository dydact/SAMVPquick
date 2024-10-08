import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar'; // Change this line
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment); // Change this line

const SchedulingContainer = styled.div`
  padding: 2rem;
`;

const CalendarContainer = styled.div`
  height: 500px;
  margin-top: 2rem;
`;

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const Scheduling: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([
        ...events,
        {
          id: events.length,
          title,
          start,
          end,
        },
      ]);
    }
  };

  return (
    <SchedulingContainer>
      <h1>Scheduling</h1>
      <p>Manage your team's schedule and assignments here.</p>
      <CalendarContainer>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelect}
        />
      </CalendarContainer>
    </SchedulingContainer>
  );
};

export default Scheduling;
