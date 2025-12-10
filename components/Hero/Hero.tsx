import css from './Hero.module.css';
import CampButton from '../CampButton/CampButton';

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css.content}>
          <h1 className={css.hero_title}>Campers of your dreams</h1>
          <p className={css.hero_text}>
            You can find everything you want in our catalog.
          </p>
          <CampButton href="/catalog" textBtn="View Now" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
