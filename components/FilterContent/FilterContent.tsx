'use client';

import { useDebouncedCallback } from 'use-debounce';

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
}: FilterContentProps) {
  const FORM_MAP: Record<FormType, string> = {
    panelTruck: 'Van',
    alcove: 'Alcove',
    fullyIntegrated: 'Fully Integrated',
  };

  const handleFormClick = (form: FormType) => {
    onFilterChange(prev => ({ ...prev, form: form }));
  };

  const handleEngineClick = (engine: EngineType) => {
    onFilterChange(prev => ({ ...prev, engine: engine }));
  };

  const setDebouncedFilter = useDebouncedCallback((location: string) => {
    onFilterChange(prev => ({ ...prev, location }));
  }, 300);

  const handleLocationChange = (location: string) => {
    setDebouncedFilter(location);
  };

  const handleEquipmentChange = (equipment: EquipmentOption) => {
    onFilterChange(prev => {
      const newEquipment = prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment];
      return { ...prev, equipment: newEquipment };
    });
  };

  const handleFilterClick = () => {
    onFilterChange(prev => ({ ...prev }));
  };

  return (
    <div className={css.filterContentContainer}>
      <div className={css.locationWrapper}>
        <p className={css.locationLabel}>Location</p>

        <div className={css.inputWrapper}>
          <input
            type="text"
            placeholder="City"
            className={css.locationInput}
            value={currentFilters.location}
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
                checked={currentFilters.equipment.includes(equipment.option)}
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
                checked={currentFilters.form === form}
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
      <button onClick={handleFilterClick} className={css.applyBtn}>
        Apply Filters
      </button>
    </div>
  );
}
