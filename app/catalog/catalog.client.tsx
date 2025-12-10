'use client';
import CampersList from '@/components/CampersList/CampersList';

import { fetchCampers, FetchCampersResponse } from '@/lib/api/clientApi';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import css from './catalog.module.css';
import { useState, useMemo, useEffect } from 'react';
import SidebarFilters from '@/components/SidebarFilter/SidebarFilter';
import { AllFiltersState, EquipmentOption } from '@/types/filters';
import { EngineType, TransmissionType, FormType } from '@/types/camper';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Loading from '../loading';
import { toast, ToastContainer } from 'react-toastify';
import CampButton from '@/components/CampButton/CampButton';

const getFiltersFromParams = (
  searchParams: URLSearchParams
): AllFiltersState => {
  const location = searchParams.get('location') || '';
  const form = (searchParams.get('form') as FormType | 'Усі') || 'Усі';
  const engine = (searchParams.get('engine') as EngineType | 'Усі') || 'Усі';
  const equipment =
    (searchParams.get('equipment')?.split(',') as EquipmentOption[]) || [];
  return {
    location,
    form,
    engine,
    equipment,
  };
};

export default function CampersClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<AllFiltersState>(() =>
    getFiltersFromParams(searchParams)
  );
  const apiFilters = useMemo(
    () => ({
      ...filters,
    }),
    [filters]
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    FetchCampersResponse,
    Error,
    InfiniteData<FetchCampersResponse, number>,
    (string | AllFiltersState)[],
    number
  >({
    queryKey: ['campers', apiFilters],

    queryFn: ({ pageParam }) => {
      const location: string = apiFilters.location;
      const form: FormType | undefined =
        apiFilters.form === 'Усі' ? undefined : apiFilters.form;
      const engine: EngineType | undefined =
        apiFilters.engine === 'Усі' ? undefined : apiFilters.engine;
      const equipment: EquipmentOption[] = apiFilters.equipment;

      const transmission: TransmissionType | undefined = equipment.includes(
        'automatic'
      )
        ? 'automatic'
        : undefined;

      return fetchCampers({
        page: String(pageParam),
        perPage: '4',
        location,
        form,
        engine,
        ...(Object.fromEntries(equipment.map(item => [item, true])) as Record<
          (typeof equipment)[number],
          boolean
        >),
        transmission,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap(page => page.items).length;
      if (totalLoaded < lastPage.total) {
        return allPages.length + 1;
      }
      return undefined;
    },

    refetchOnMount: false,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (apiFilters.location !== '') {
      params.set('location', apiFilters.location);
    }
    if (apiFilters.form !== 'Усі') {
      params.set('form', apiFilters.form);
    }
    if (apiFilters.engine !== 'Усі') {
      params.set('engine', apiFilters.engine);
    }
    if (apiFilters.equipment.length > 0) {
      params.set('equipment', apiFilters.equipment.join(','));
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [apiFilters, pathname, router]);
  const handleClearAll = () => {
    setFilters({
      location: '',
      form: 'Усі',
      engine: 'Усі',
      equipment: [],
    });
  };

  const campers = data?.pages.flatMap(page => page.items) ?? [];
  const shown = campers.length;
  const total = data?.pages[0]?.total ?? 0;
  const handleLoadMore = () => {
    fetchNextPage().then(() => {
      requestAnimationFrame(() => {
        window.scrollBy({
          top: 650,
          behavior: 'smooth',
        });
      });
    });
  };

  if (isError && !hasNextPage) {
    toast.error(
      'Do not found any campervan by current filters, clear filters and try again!'
    );
  }

  return (
    <div className="container">
      <main className={css.main}>
        <aside className={css.tablet}>
          <SidebarFilters
            currentFilters={filters}
            onFilterChange={setFilters}
            onClearAll={handleClearAll}
          />
        </aside>
        <div className={css.contentArea}>
          {isLoading && <Loading></Loading>}
          <CampersList campers={campers}></CampersList>{' '}
          <div className={css.buttonContainer}>
            {hasNextPage && (
              <CampButton
                handleButtonClick={handleLoadMore}
                disabled={!hasNextPage || isFetchingNextPage}
                textBtn={isFetchingNextPage ? 'loading' : 'Load more'}
                styleBtn="secondary"
              />
            )}
          </div>
        </div>{' '}
        <ToastContainer position="top-right" autoClose={2000} />
      </main>{' '}
    </div>
  );
}
