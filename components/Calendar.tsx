import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  unavailableDates: string[]; // Expecting dates in 'YYYY-MM-DD' format
  onDateClick: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ unavailableDates, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDay }, (_, i) => i);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getISODate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft /></button>
        <h2 className="text-lg font-semibold text-neutral capitalize">
          {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {weekDays.map(day => <div key={day} className="font-medium text-gray-500 py-2">{day}</div>)}
        {blanks.map(blank => <div key={`blank-${blank}`} className="py-2"></div>)}
        {days.map(day => {
          const isoDate = getISODate(day);
          const isUnavailable = unavailableDates.includes(isoDate);
          const isToday = new Date().toISOString().split('T')[0] === isoDate;
          return (
            <div key={day} className="py-1">
              <button
                onClick={() => onDateClick(isoDate)}
                className={`w-10 h-10 rounded-full transition-colors ${
                  isUnavailable 
                    ? 'bg-red-500 text-white line-through' 
                    : 'hover:bg-primary/10'
                } ${
                  isToday && !isUnavailable ? 'ring-2 ring-primary' : ''
                }`}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
       <p className="text-xs text-center text-gray-500 mt-4">Haz clic en una fecha para marcarla como no disponible.</p>
    </div>
  );
};

export default Calendar;
