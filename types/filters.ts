import { EngineType, FormType } from './camper';

export type EquipmentOption =
  | 'AC'
  | 'bathroom'
  | 'kitchen'
  | 'TV'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water'
  | 'automatic';

export const EquipmentIcons: Record<EquipmentOption, string> = {
  AC: 'icon-ac',
  bathroom: 'icon-bathroom',
  kitchen: 'icon-kitchen',
  TV: 'icon-tv',
  radio: 'icon-radio',
  refrigerator: 'icon-refrigerator',
  microwave: 'icon-microwave',
  gas: 'icon-gas',
  water: 'icon-water',
  automatic: 'icon-automatic',
};

export interface EquipmentOptionRecord {
  option: EquipmentOption;
  icon: string;
}

export const EQUIPMENT: EquipmentOptionRecord[] = [
  { option: 'AC', icon: EquipmentIcons.AC },
  { option: 'bathroom', icon: EquipmentIcons.bathroom },
  { option: 'kitchen', icon: EquipmentIcons.kitchen },
  { option: 'TV', icon: EquipmentIcons.TV },
  { option: 'radio', icon: EquipmentIcons.radio },
  { option: 'refrigerator', icon: EquipmentIcons.refrigerator },
  { option: 'microwave', icon: EquipmentIcons.microwave },
  { option: 'gas', icon: EquipmentIcons.gas },
  { option: 'water', icon: EquipmentIcons.water },
  { option: 'automatic', icon: EquipmentIcons.automatic },
];

export const ENGINE: EngineType[] = ['petrol', 'diesel', 'hybrid'];

export const FORM_TRUCK: FormType[] = [
  'panelTruck',
  'alcove',
  'fullyIntegrated',
];

export interface AllFiltersState {
  location: string;
  form: FormType | 'Усі';
  engine: EngineType | 'Усі';
  equipment: EquipmentOption[];
}

export interface FilterContentProps {
  currentFilters: AllFiltersState;
  onFilterChange: React.Dispatch<React.SetStateAction<AllFiltersState>>;
  onClearAll?: () => void;
}

export interface FilterContainerProps extends FilterContentProps {
  onClearAll: () => void;
  total?: number;
  shown?: number;
}
