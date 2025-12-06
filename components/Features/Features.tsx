import { Camper } from '@/types/camper';
import { EQUIPMENT } from '@/types/filters';
import css from './Features.module.css';

type FeaturesProp = {
  camper: Camper;
};

export default function Features({ camper }: FeaturesProp) {
  if (!camper) return null;

  const camperFeatures: Record<string, string> = {
    form: camper.form,
    length: camper.length,
    width: camper.width,
    height: camper.height,
    tank: camper.tank,
    consumption: camper.consumption,
  };

  return (
    <div className={css.container}>
      <ul className={css.featuresRow}>
        {camper.transmission && camper.transmission === 'automatic' && (
          <li className={css.feature}>
            <svg className={css.featureIcon}>
              <use href={`/icons.svg#icon-${camper.transmission}`}></use>
            </svg>
            {camper.transmission}
          </li>
        )}
        {camper.engine && (
          <li className={css.feature}>
            <svg className={css.featureIcon}>
              <use href={`/icons.svg#icon-${camper.engine}`}></use>
            </svg>
            {camper.engine}
          </li>
        )}

        {EQUIPMENT.filter(el => el.option !== 'automatic').map(
          equipment =>
            camper[equipment.option as keyof Camper] && (
              <li key={equipment.option} className={css.feature}>
                <svg
                  className={`${css.featureIcon} ${
                    equipment.option === 'refrigerator' ? css.iconRef : ''
                  }`}
                >
                  <use href={`/icons.svg#${equipment.icon}`}></use>
                </svg>
                {equipment.option}
              </li>
            )
        )}
      </ul>

      <div>
        <h3 className={css.title}>Vehicle details</h3>
        <div className={css.separator}></div>
        <ul className={css.detailList}>
          {Object.entries(camperFeatures).map(([key, value]) => (
            <li key={key} className={css.detailRow}>
              <span className={css.detailText}>{key}</span>
              <span className={css.detailText}>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
