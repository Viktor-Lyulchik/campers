import css from './SidebarFilter.module.css';
import FilterContent from '../FilterContent/FilterContent';
import { FilterContainerProps } from '@/types/filters';

export default function SidebarFilters({
  currentFilters,
  onFilterChange,
  onClearAll,
  shown,
  total,
}: FilterContainerProps) {
  return (
    <div>
      <div className={css.sidebarContainer}>
        <div className={css.filters}>
          <button type="button" className={css.button} onClick={onClearAll}>
            {'clear All'}
          </button>
        </div>
        <p className={css.shown}>
          {'shown'} {shown} {'of'} {total}
        </p>
        <FilterContent
          currentFilters={currentFilters}
          onFilterChange={onFilterChange}
        />
      </div>
    </div>
  );
}
