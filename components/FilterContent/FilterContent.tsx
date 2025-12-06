'use client';

import { useState, useEffect } from 'react';

import css from './FilterContent.module.css';
import {
  EQUIPMENT,
  ENGINE,
  FORM_TRUCK,
  FilterContentProps,
  EquipmentOption,
} from '@/types/filters';
import { EngineType, FormType } from '@/types/camper';

export default function FilterContent({
  currentFilters,
  onFilterChange,
  onClearAll,
}: FilterContentProps) {
  const [localFilters, setLocalFilters] = useState(() => currentFilters);
  const [locationInput, setLocationInput] = useState(localFilters.location);

  const handleLocationChange = (value: string) => {
    setLocationInput(value);
    setLocalFilters(prev => ({ ...prev, location: value }));
  };

  const FORM_MAP: Record<FormType, string> = {
    panelTruck: 'Van',
    alcove: 'Alcove',
    fullyIntegrated: 'Fully Integrated',
  };

  const handleFormClick = (form: FormType) => {
    setLocalFilters(prev => ({ ...prev, form }));
  };

  const handleEngineClick = (engine: EngineType) => {
    setLocalFilters(prev => ({ ...prev, engine }));
  };

  const handleEquipmentChange = (equipment: EquipmentOption) => {
    setLocalFilters(prev => {
      const updated = prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment];

      return { ...prev, equipment: updated };
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  useEffect(() => {
    setLocalFilters(currentFilters);
    setLocationInput(currentFilters.location);
  }, [currentFilters]);

  return (
    <div className={css.filterContentContainer}>
      <div className={css.locationWrapper}>
        <p className={css.locationLabel}>Location</p>

        <div className={css.inputWrapper}>
          <input
            type="text"
            placeholder="City"
            className={css.locationInput}
            value={locationInput}
            onChange={e => handleLocationChange(e.target.value)}
          />
          <svg className={css.iconMap} width="20" height="20">
            <use href="/icons.svg#icon-map" />
          </svg>
        </div>
      </div>
      <div>
        <div className={css.filterHeader}>
          <p className={css.filtersTitle}>Filters</p>
          <p className={css.vehicleEquipment}>Vehicle equipment</p>

          <hr className={css.divider} />
        </div>
        <ul className={css.equipmentList}>
          {EQUIPMENT.map(equipment => (
            <li key={equipment.option} className={css.equipmentItem}>
              <input
                type="checkbox"
                id={`equipment-${equipment.option}`}
                className={css.customCheckbox}
                value={equipment.option}
                checked={localFilters.equipment.includes(equipment.option)}
                onChange={() => handleEquipmentChange(equipment.option)}
              />
              <label
                className={css.card}
                htmlFor={`equipment-${equipment.option}`}
              >
                <svg className={css.icon}>
                  <use href={`/icons.svg#${equipment.icon}`} />
                </svg>

                {equipment.option}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className={css.filterHeader}>
          <h3>Vehicle type</h3>
          <hr className={css.divider} />
        </div>
        <ul className={css.formList}>
          {FORM_TRUCK.map(form => (
            <li key={form} className={css.formItem}>
              <input
                type="radio"
                id={`form-${form}`}
                name="form-filter-group"
                value={form}
                checked={localFilters.form === form}
                onChange={() => handleFormClick(form)}
                className={css.customRadio}
              />
              <label htmlFor={`form-${form}`} className={css.card}>
                <svg className={css.icon}>
                  <use href={`/icons.svg#icon-${form}`} />
                </svg>
                {FORM_MAP[form]}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className={css.filterHeader}>
          <h3>Engine type</h3>
          <hr className={css.divider} />
        </div>
        <ul className={css.formList}>
          {ENGINE.map(engine => (
            <li key={engine} className={css.formItem}>
              <input
                type="radio"
                id={`engine-${engine}`}
                name="engine-filter-group"
                value={engine}
                checked={localFilters.engine === engine}
                onChange={() => handleEngineClick(engine)}
                className={css.customRadio}
              />
              <label htmlFor={`engine-${engine}`} className={css.card}>
                <svg className={css.icon}>
                  <use href={`/icons.svg#icon-${engine}`} />
                </svg>
                {engine}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={css.buttonContainer}>
        <button onClick={handleApplyFilters} className={css.applyBtn}>
          Search
        </button>
        <button onClick={onClearAll} className={css.applyBtn}>
          Reset search
        </button>
      </div>
    </div>
  );
}
