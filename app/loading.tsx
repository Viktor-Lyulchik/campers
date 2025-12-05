import css from './loading.module.css';

export default function Loading() {
  return (
    <div className={css.camperLoaderContainer}>
      <div className={css.camperLoader}>
        <svg viewBox="0 0 64 32" className={css.camperIcon}>
          <rect x="2" y="10" width="45" height="18" rx="3" />
          <rect x="20" y="5" width="27" height="15" rx="3" />
          <circle cx="15" cy="28" r="4" />
          <circle cx="40" cy="28" r="4" />
        </svg>
      </div>
    </div>
  );
}
