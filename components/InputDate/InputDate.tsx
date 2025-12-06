import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import Calendar from '../Calendar/Calendar';
import css from './InputDate.module.css';

interface InputDateProp {
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function InputDate({ value, onChange }: InputDateProp) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={css.wrapper} ref={ref}>
      <input
        type="text"
        readOnly
        value={value ? format(value, 'dd.MM.yyyy') : ''}
        onClick={() => setOpen(!open)}
        placeholder="Booking date*"
        className={css.input}
      />

      {open && (
        <div className={css.calendarWrapper}>
          <Calendar
            value={value || new Date()}
            onChange={date => {
              onChange(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
