import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, X } from 'lucide-react';
import PHOTOS from '../data/photos';

const getColumnCount = () => {
  if (typeof window === 'undefined') return 5;
  if (window.matchMedia('(max-width: 760px)').matches) return 2;
  if (window.matchMedia('(max-width: 960px)').matches) return 3;
  if (window.matchMedia('(max-width: 1180px)').matches) return 4;
  return 5;
};

const getPhotoHeightRatio = (photo) => {
  const dimensions = photo.src.match(/\/(\d+)\/(\d+)$/);
  if (!dimensions) return 1;
  return Number(dimensions[2]) / Number(dimensions[1]);
};

const balanceIntoColumns = (photos, columnCount) => {
  const minimumColumnSize = Math.floor(photos.length / columnCount);
  const fullerColumns = photos.length % columnCount;
  const columns = Array.from({ length: columnCount }, (_, columnIndex) => ({
    photos: [],
    heightRatio: 0,
    maximumSize: minimumColumnSize + (columnIndex < fullerColumns ? 1 : 0),
  }));

  photos.forEach((photo) => {
    const availableColumns = columns.filter(({ photos: columnPhotos, maximumSize }) => (
      columnPhotos.length < maximumSize
    ));
    const shortestColumn = availableColumns.reduce((shortest, column) => (
      column.heightRatio < shortest.heightRatio ? column : shortest
    ));

    shortestColumn.photos.push(photo);
    shortestColumn.heightRatio += getPhotoHeightRatio(photo);
  });

  return columns.map(({ photos: columnPhotos }) => columnPhotos);
};

const Photos = ({ onNavigate }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia('(max-width: 760px)'),
      window.matchMedia('(max-width: 960px)'),
      window.matchMedia('(max-width: 1180px)'),
    ];
    const updateColumnCount = () => setColumnCount(getColumnCount());

    mediaQueries.forEach((query) => query.addEventListener('change', updateColumnCount));
    return () => {
      mediaQueries.forEach((query) => query.removeEventListener('change', updateColumnCount));
    };
  }, []);

  useEffect(() => {
    if (!selectedPhoto) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto]);

  const handleHomeClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    onNavigate('home');
  };

  return (
    <main id="main-content" className="photos-page">
      <div className="motion-blur" aria-hidden="true">
        <div className="motion-blur__wash motion-blur__wash--blue" />
        <div className="motion-blur__wash motion-blur__wash--coral" />
        <div className="motion-blur__wash motion-blur__wash--cyan" />
        <div className="motion-blur__veil" />
      </div>

      <header className="photos-header">
        <a className="photos-back" href="/" onClick={handleHomeClick} aria-label="Back to home">
          <ArrowLeft size={18} aria-hidden="true" />
        </a>
        <h1>Photos</h1>
      </header>

      <section
        className="photos-masonry"
        aria-label="Photographs by Priyal Taneja"
        style={{ '--photo-columns': columnCount }}
      >
        {balanceIntoColumns(PHOTOS, columnCount).map((column, columnIndex) => (
          <div className="photos-column" key={`photo-column-${columnIndex}`}>
            {column.map((photo, rowIndex) => {
              const photoIndex = PHOTOS.indexOf(photo);
              return (
                <button
                  className={`photos-tile photos-tile--${photo.id}`}
                  type="button"
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  aria-label={`Open photo: ${photo.alt}`}
                  style={{
                    '--photo-reveal-row': rowIndex,
                    '--photo-reveal-column': columnIndex,
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={photoIndex < 5 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ objectPosition: photo.position }}
                  />
                </button>
              );
            })}
          </div>
        ))}
      </section>

      {selectedPhoto && createPortal(
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.alt}
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="photo-lightbox__close"
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photo"
            autoFocus
          >
            <X aria-hidden="true" />
          </button>
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>,
        document.body,
      )}
    </main>
  );
};

export default Photos;
