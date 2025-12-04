import { Link } from 'lucide-react';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css.content}>
          <h1 className={css.hero_title}>Campers of your dreams</h1>
          <p className={css.hero_text}>
            You can find everything you want in our catalog.
          </p>

          <a href="/catalog" className={css.link_primary}>
            View Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
