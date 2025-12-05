import css from './SidebarFilter.module.css';
import FilterContent from '../FilterContent/FilterContent';
import { FilterContainerProps } from '@/types/filters';

export default function SidebarFilters({
  currentFilters,
  onFilterChange,
  onClearAll,
}: FilterContainerProps) {
  return (
    <div>
      <div className={css.sidebarContainer}>
        <FilterContent
          currentFilters={currentFilters}
          onFilterChange={onFilterChange}
          onClearAll={onClearAll}
        />
      </div>
    </div>
  );
}
