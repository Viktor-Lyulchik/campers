import { Camper } from '@/types/camper';
import css from './Reviews.module.css';
import { AiFillStar } from 'react-icons/ai';

type ReviewsProp = {
  camper: Camper;
};

export default function Reviews({ camper }: ReviewsProp) {
  if (!camper || !camper.reviews) return null;

  return (
    <div className={css.container}>
      <div className={css.reviewsList}>
        {camper.reviews.map(review => (
          <div key={review.reviewer_name} className={css.reviewItem}>
            <div className={css.reviewerWrapper}>
              <div className={css.reviewerAvatar}>
                {review.reviewer_name[0]}
              </div>

              <div>
                <p className={css.reviewerName}>{review.reviewer_name}</p>
                <div className={css.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <AiFillStar
                      key={i}
                      size={16}
                      color={`${
                        review.reviewer_rating > i ? '#ffc531' : '#ccc'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
