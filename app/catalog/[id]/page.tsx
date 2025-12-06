'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import Loader from '@/app/loading';
import Features from '@/components/Features/Features';
import BookingForm from '@/components/BookingForm/BookingForm';
import Reviews from '@/components/Reviews/Reviews';
import { fetchCamperById } from '@/lib/api/clientApi';
import { Camper } from '@/types/camper';

import css from './camperpage.module.css';
import { AiFillStar } from 'react-icons/ai';

export default function CamperPage() {
  const params = useParams();
  const { id } = params;
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<'features' | 'reviews'>(
    'features'
  );

  useEffect(() => {
    const rawId = params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    if (!id) return;

    const loadCamper = async () => {
      try {
        const data = await fetchCamperById(id);
        setCamper(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCamper();
  }, [id, params.id]);

  if (loading) return <Loader />;
  if (!camper) return <p>Camper not found</p>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.headerSection}>
          <h2 className={css.title}>{camper.name}</h2>

          <div className={css.infoRow}>
            <AiFillStar size={16} color="#ffc531" /> {''}
            <p className={css.rating}>{camper.rating}</p>
            <Link href="#reviews" className={css.reviewLink}>
              ({camper.reviews.length} {'reviews'})
            </Link>
            <div className={css.location}>
              <svg className={css.mapIcon} width="16" height="16">
                <use href="/icons.svg#icon-map" />
              </svg>
              <p>{camper.location}</p>
            </div>
          </div>

          <p className={css.price}>€{camper.price.toFixed(2)}</p>

          <div className={css.gallery}>
            {camper.gallery.map((img, index) => (
              <Image
                width={292}
                height={312}
                key={index}
                src={img.original}
                alt={`${camper.name} image ${index + 1}`}
                className={css.galleryImage}
              />
            ))}
          </div>

          <p className={css.description}>{camper.description}</p>
        </div>

        <section className={css.pages} id="reviews">
          <button
            className={`${css.pageButton} ${
              activePage === 'features' ? css.activePage : ''
            }`}
            onClick={() => setActivePage('features')}
          >
            Features
          </button>
          <button
            className={`${css.pageButton} ${
              activePage === 'reviews' ? css.activePage : ''
            }`}
            onClick={() => setActivePage('reviews')}
          >
            Reviews
          </button>
        </section>

        <div className={css.content}>
          <div className={css.leftColumn}>
            {activePage === 'features' && <Features camper={camper} />}
            {activePage === 'reviews' && <Reviews camper={camper} />}
          </div>

          <BookingForm />
        </div>
      </div>
    </main>
  );
}
