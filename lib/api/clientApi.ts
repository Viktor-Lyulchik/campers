import { isAxiosError } from 'axios';
import { nextServer } from './api';
import { Camper, EngineType, FormType, TransmissionType } from '@/types/camper';
import { serializeParams } from '../utils';

export interface FetchCampersResponse {
  items: Camper[];
  total: number;
}

export interface FetchCampersParam {
  page?: string;
  perPage?: string;
  form?: FormType;
  transmission?: TransmissionType;
  engine?: EngineType;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  location?: string;
  sortBy?: 'price' | 'rating' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export async function fetchCampers(
  param: FetchCampersParam
): Promise<FetchCampersResponse> {
  const {
    page = 1,
    perPage = 4,
    form,
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
    location,
    sortBy,
    sortOrder,
  } = param;
  try {
    const params: Partial<FetchCampersParam> = {
      page: String(page),
      perPage: String(perPage),
    };
    if (form) params.form = form;
    if (transmission) params.transmission = transmission;
    if (engine) params.engine = engine;
    if (AC) params.AC = AC;
    if (bathroom) params.bathroom = bathroom;
    if (kitchen) params.kitchen = kitchen;
    if (TV) params.TV = TV;
    if (radio) params.radio = radio;
    if (refrigerator) params.refrigerator = refrigerator;
    if (microwave) params.microwave = microwave;
    if (gas) params.gas = gas;
    if (water) params.water = water;
    if (location) params.location = location;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;

    // console.log('clientsApi = ', params);

    const { data } = await nextServer.get<FetchCampersResponse>('/campers', {
      params,
      paramsSerializer: {
        serialize: serializeParams,
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Fetching campers failed'
      );
    }
    throw new Error('Fetching campers failed');
  }
}

export async function fetchCamperById(id: string): Promise<Camper> {
  try {
    const { data } = await nextServer.get<Camper>(`/campers/${id}`, {
      withCredentials: false,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Fetching camper failed'
      );
    }
    throw new Error('Fetching camper failed');
  }
}
