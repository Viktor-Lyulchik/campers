import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavouriteState {
  favourites: string[];
  addFavourite: (id: string) => void;
  removeFavourite: (id: string) => void;
  toggleFavourite: (id: string) => void;
}

export const useFavouritesStore = create<FavouriteState>()(
  persist(
    (set, get) => ({
      favourites: [],
      addFavourite: id => set({ favourites: [...get().favourites, id] }),
      removeFavourite: id =>
        set({ favourites: get().favourites.filter(favId => favId !== id) }),
      toggleFavourite: id =>
        set({
          favourites: get().favourites.includes(id)
            ? get().favourites.filter(favId => favId !== id)
            : [...get().favourites, id],
        }),
    }),
    {
      name: 'favourites-storage',
    }
  )
);
