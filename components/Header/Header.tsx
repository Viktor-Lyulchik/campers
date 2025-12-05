import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.left}>
            <Link href="/">
              <svg width={136} height={16}>
                <use href="/icons.svg#icon-logo"></use>
              </svg>
            </Link>
          </div>

          <ul className={css.navList}>
            <li>
              <Link href="/" className={css.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className={css.navLink}>
                Catalog
              </Link>
            </li>
          </ul>

          <div className={css.right}></div>
        </div>
      </div>
    </header>
  );
}
