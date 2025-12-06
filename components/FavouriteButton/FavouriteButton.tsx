import { useFavouritesStore } from '@/lib/store/favouritesStore';
import { LuHeart } from 'react-icons/lu';
import css from './FavouriteButton.module.css';
import { Camper } from '@/types/camper';

interface FavouriteButtonProps {
  id: Camper['id'];
}

export default function FavouriteButton({ id }: FavouriteButtonProps) {
  const { favourites, toggleFavourite } = useFavouritesStore();

  const isFavourite = favourites.includes(id);

  return (
    <button
      className={css.favorites}
      onClick={() => toggleFavourite(id)}
      aria-label="Обране"
    >
      <LuHeart
        className={css.iconHeart}
        size={24}
        stroke={isFavourite ? '#101828' : '#e44848'}
        fill="transparent"
        strokeWidth={2}
      />
    </button>
  );
}
