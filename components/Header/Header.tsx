'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

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
              <Link
                href="/"
                className={`${css.navLink} ${
                  pathname === '/' ? css.active : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={`${css.navLink} ${
                  pathname.startsWith('/catalog') ? css.active : ''
                }`}
              >
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
