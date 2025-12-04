import { fetchCampers } from '@/lib/api/clientApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import css from './catalog.module.css';
import CatalogClient from './catalog.client';

async function CatalogPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['campers'],
    queryFn: ({ pageParam }) =>
      fetchCampers({ page: String(pageParam), perPage: '4' }),
    initialPageParam: 1,
  });
  return (
    <section className={css.section}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogClient />
      </HydrationBoundary>
    </section>
  );
}

export default CatalogPage;
