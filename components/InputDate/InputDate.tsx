import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import Calendar from '../Calendar/Calendar';
import css from './InputDate.module.css';

interface InputDateProp {
  name: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onBlur: () => void;
  touched?: boolean;
  error?: string;
}

export default function InputDate({
  name,
  value,
  onChange,
  onBlur,
  touched,
  error,
}: InputDateProp) {
  const [open, setOpen] = useState(false);
  const [wasOpened, setWasOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (open) {
          setOpen(false);
          if (wasOpened) {
            onBlur();
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, wasOpened, onBlur]);

  const hasError = touched && error;

  const handleClick = () => {
    setOpen(!open);
    if (!wasOpened) {
      setWasOpened(true);
    }
  };

  return (
    <div className={css.wrapper} ref={ref}>
      <input
        type="text"
        name={name}
        readOnly
        value={value ? format(value, 'dd.MM.yyyy') : ''}
        onClick={handleClick}
        placeholder="Booking date*"
        className={`${css.input} ${hasError ? css.inputError : ''}`}
      />

      {open && (
        <div className={css.calendarWrapper}>
          <Calendar
            value={value || new Date()}
            onChange={date => {
              onChange(date);
              setOpen(false);
              onBlur();
            }}
          />
        </div>
      )}
    </div>
  );
}
