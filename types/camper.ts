export type EngineType = 'petrol' | 'diesel' | 'hybrid';
export type TransmissionType = 'manual' | 'automatic';
export type FormType = 'panelTruck' | 'alcove' | 'fullyIntegrated';

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: FormType;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: TransmissionType;
  engine: EngineType;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: {
    thumb: string;
    original: string;
  }[];
  reviews: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
}
