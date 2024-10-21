import React, { useState } from 'react';
import { format, startOfMonth, addMonths, subMonths, isSameDay, isToday } from 'date-fns';

const Calendar = ({ importantDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousMonth} className="bg-blue-500 text-white rounded px-2 py-1">
          Previous
        </button>
        <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="bg-blue-500 text-white rounded px-2 py-1">
          Next
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 text-center text-gray-500">
        {days.map((day, index) => (
          <div key={index} className="font-bold">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const startDate = startOfMonth(currentMonth);
    const startDay = startDate.getDay();
    const totalDays = 31; // maximum days in a month
    const currentDate = new Date();

    const cells = [];
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="border border-transparent"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      if (date.getMonth() !== currentMonth.getMonth()) continue;

      const isImportant = importantDates.some(importantDate => 
        isSameDay(importantDate, date)
      );

      cells.push(
        <div key={day} className={`border border-gray-200 p-2 text-center ${isToday(date) ? 'bg-blue-200' : ''} ${isImportant ? 'bg-yellow-200' : ''}`}>
          <span className={`${isImportant ? 'font-bold' : ''}`}>{day}</span>
        </div>
      );
    }

    return <div className="grid grid-cols-7">{cells}</div>;
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
