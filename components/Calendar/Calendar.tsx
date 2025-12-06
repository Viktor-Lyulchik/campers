import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, subMonths, format } from 'date-fns';
import { uk } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import css from './Calendar.module.css';

interface CalendarProp {
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function Calendar({ value, onChange }: CalendarProp) {
  const [month, setMonth] = useState(value || new Date());

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.customHeader}>
          <button
            type="button"
            className={css.navButton}
            onClick={() => setMonth(subMonths(month, 1))}
          >
            <ChevronLeft size={20} />
          </button>
          <span className={css.monthLabel}>{format(month, 'MMMM yyyy')}</span>
          <button
            type="button"
            className={css.navButton}
            onClick={() => setMonth(addMonths(month, 1))}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <DayPicker
          mode="single"
          selected={value || undefined}
          onSelect={date => date && onChange(date)}
          disabled={{ before: new Date() }}
          showOutsideDays={true}
          month={month}
          onMonthChange={setMonth}
          hideNavigation
          locale={uk}
          weekStartsOn={1}
          formatters={{
            formatWeekdayName: date => {
              const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
              return days[(date.getDay() + 6) % 7];
            },
          }}
        />
      </div>
    </div>
  );
}
