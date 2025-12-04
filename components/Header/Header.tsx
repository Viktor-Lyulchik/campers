import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Link href="/">
              <svg width={136} height={16}>
                <use href="/icons.svg#icon-logo"></use>
              </svg>
            </Link>
          </div>

          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className={styles.navLink}>
                Catalog
              </Link>
            </li>
          </ul>

          <div className={styles.right}></div>
        </div>
      </div>
    </header>
  );
}
