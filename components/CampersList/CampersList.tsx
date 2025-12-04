'use client';
import { Camper } from '@/types/camper';
import css from './CampersList.module.css';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import { EQUIPMENT } from '@/types/filters';

interface CampersListProps {
  campers: Camper[];
}
export default function CampersList({ campers }: CampersListProps) {
  return (
    <div className={css.sliderContainer}>
      <ul className={css.list}>
        {campers.map(camper => (
          <li key={camper.id} className={css.listItem}>
            <div className={css.card}>
              <Link href={`/campers/${camper.id}`} className={css.detailLink}>
                <Image
                  src={camper.gallery[0].original}
                  alt={camper.name}
                  width={292}
                  height={320}
                  className={css.image}
                />
              </Link>
              <div className={css.cardData}>
                <div className={css.info}>
                  <p className={css.name}>{camper.name}</p>
                  <div className={css.priceFavourite}>
                    <p className={css.price}>€{camper.price}</p>
                    <FavouriteButton id={camper.id} />
                  </div>
                </div>
                <div className={css.reviews}>
                  <p className={css.star}>
                    <AiFillStar size={16} color="#ffc531" /> {''}
                    {camper.rating}({camper.reviews.length ?? 0} Reviews)
                  </p>
                  <p className={css.location}>
                    <svg className={css.iconMap} width="16" height="16">
                      <use href="/icons.svg#icon-map" />
                    </svg>
                    {camper.location}
                  </p>
                </div>
                <p className={css.description}>{camper.description}</p>

                <ul className={css.wrapper}>
                  {camper.transmission &&
                    camper.transmission === 'automatic' && (
                      <li className={css.feature}>
                        <svg className={css.featureIcon}>
                          <use
                            href={`/icons.svg#icon-${camper.transmission}`}
                          ></use>
                        </svg>
                        {camper.transmission}
                      </li>
                    )}
                  {camper.engine && (
                    <li className={css.feature}>
                      <svg className={css.featureIcon}>
                        <use href={`/icons.svg#icon-petrol`}></use>
                      </svg>
                      {camper.engine}
                    </li>
                  )}
                  {EQUIPMENT.filter(el => el.option !== 'automatic').map(
                    equipment =>
                      camper[equipment.option as keyof Camper] && (
                        <li key={equipment.option} className={css.feature}>
                          <svg className={css.featureIcon}>
                            <use href={`/icons.svg#${equipment.icon}`}></use>
                          </svg>
                          {equipment.option}
                        </li>
                      )
                  )}
                </ul>
                <Link href={`/campers/${camper.id}`} className={css.detailLink}>
                  <button className={css.detail}>{'Show more'}</button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
