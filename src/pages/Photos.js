import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, X } from 'lucide-react';
import PHOTOS from '../data/photos';

const getColumnCount = () => {
  if (typeof window === 'undefined') return 6;
  if (window.matchMedia('(max-width: 760px)').matches) return 2;
  if (window.matchMedia('(max-width: 1023px)').matches) return 4;
  return 6;
};

const getPhotoHeightRatio = (photo) => {
  if (photo.aspect) {
    const [width, height] = photo.aspect.split('/').map(Number);
    if (width && height) return height / width;
  }

  if (photo.width && photo.height) return photo.height / photo.width;

  const dimensions = photo.src.match(/\/(\d+)\/(\d+)$/);
  if (!dimensions) return 1;
  return Number(dimensions[2]) / Number(dimensions[1]);
};

const FOUR_COLUMN_LAYOUT = [
  ['flower-bouquets', 'tennis-court', 'bay-bridge-moon'],
  ['golden-gate', 'grand-canyon', 'pink-garden-flowers'],
  ['beach-shells', 'new-york-taxi', 'museum-flowers'],
  ['coffee-table', 'coast-birds', 'flower-market'],
];

const SIX_COLUMN_LAYOUT = [
  ['flower-bouquets', 'bay-bridge-moon'],
  ['golden-gate', 'pink-garden-flowers'],
  ['coffee-table', 'coast-birds'],
  ['grand-canyon', 'flower-market'],
  ['tennis-court', 'new-york-taxi'],
  ['beach-shells', 'museum-flowers'],
];

const TWO_COLUMN_LAYOUT = [
  ['golden-gate', 'new-york-taxi', 'coffee-table', 'grand-canyon', 'pink-garden-flowers', 'tennis-court'],
  ['flower-bouquets', 'coast-birds', 'flower-market', 'museum-flowers', 'bay-bridge-moon', 'beach-shells'],
];

const CURATED_COLUMN_LAYOUTS = new Map([
  [TWO_COLUMN_LAYOUT.length, TWO_COLUMN_LAYOUT],
  [FOUR_COLUMN_LAYOUT.length, FOUR_COLUMN_LAYOUT],
  [SIX_COLUMN_LAYOUT.length, SIX_COLUMN_LAYOUT],
]);

const getPreviewSrc = (src) => src.replace('/photos/', '/photos/previews/');

const balanceIntoColumns = (photos, columnCount) => {
  const curatedLayout = CURATED_COLUMN_LAYOUTS.get(columnCount);

  if (curatedLayout) {
    const photosById = new Map(photos.map((photo) => [photo.id, photo]));
    const curatedColumns = curatedLayout.map((column) => (
      column.map((photoId) => photosById.get(photoId)).filter(Boolean)
    ));
    const curatedPhotoCount = curatedColumns.reduce(
      (total, column) => total + column.length,
      0,
    );
    const curatedPhotoIds = new Set(curatedColumns.flat().map((photo) => photo.id));
    const includesEveryPhoto = photos.every((photo) => curatedPhotoIds.has(photo.id));

    if (includesEveryPhoto && curatedPhotoCount === curatedPhotoIds.size) {
      return curatedColumns;
    }
  }

  const minimumColumnSize = Math.floor(photos.length / columnCount);
  const fullerColumns = photos.length % columnCount;
  const fullerColumnIndexes = new Set(
    Array.from({ length: fullerColumns }, (_, index) => (
      Math.round(((index + 1) * (columnCount + 1)) / (fullerColumns + 1)) - 1
    )),
  );
  const columns = Array.from({ length: columnCount }, (_, columnIndex) => ({
    photos: [],
    heightRatio: 0,
    placeholderCount: 0,
    maximumSize: minimumColumnSize + (fullerColumnIndexes.has(columnIndex) ? 1 : 0),
  }));

  photos.forEach((photo) => {
    const availableColumns = columns.filter(({ photos: columnPhotos, maximumSize }) => (
      columnPhotos.length < maximumSize
    ));
    const fewestPlaceholders = Math.min(
      ...availableColumns.map(({ placeholderCount }) => placeholderCount),
    );
    const candidateColumns = photo.placeholder
      ? availableColumns.filter(({ placeholderCount }) => placeholderCount === fewestPlaceholders)
      : availableColumns;
    const shortestColumn = candidateColumns.reduce((shortest, column) => (
      column.heightRatio < shortest.heightRatio ? column : shortest
    ));

    shortestColumn.photos.push(photo);
    shortestColumn.heightRatio += getPhotoHeightRatio(photo);
    if (photo.placeholder) shortestColumn.placeholderCount += 1;
  });

  return columns.map(({ photos: columnPhotos }) => columnPhotos);
};

const Photos = ({ onNavigate }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [columnCount, setColumnCount] = useState(getColumnCount);
  const [photosReady, setPhotosReady] = useState(false);
  const masonryColumns = useMemo(
    () => balanceIntoColumns(PHOTOS, columnCount),
    [columnCount],
  );

  useEffect(() => {
    let isCurrent = true;

    const preloadPhoto = (photo) => new Promise((resolve) => {
      const image = new Image();
      const finish = () => {
        if (typeof image.decode === 'function') {
          image.decode().catch(() => undefined).finally(resolve);
          return;
        }

        resolve();
      };

      image.onload = finish;
      image.onerror = resolve;
      image.decoding = 'async';
      image.src = getPreviewSrc(photo.src);

      if (image.complete) finish();
    });

    Promise.all(PHOTOS.filter((photo) => !photo.placeholder).map(preloadPhoto))
      .then(() => {
        if (!isCurrent) return;
        requestAnimationFrame(() => setPhotosReady(true));
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia('(max-width: 760px)'),
      window.matchMedia('(max-width: 1023px)'),
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
      <header className="photos-header">
        <a className="photos-back" href="/" onClick={handleHomeClick} aria-label="Back to home">
          <ArrowLeft size={18} aria-hidden="true" />
        </a>
        <h1>Photos</h1>
      </header>

      <div className="photos-masonry-frame">
        <section
          className={`photos-masonry${photosReady ? ' photos-masonry--ready' : ''}`}
          aria-label="Photographs by Priyal Taneja"
          aria-busy={!photosReady}
          style={{ '--photo-columns': columnCount }}
        >
          {masonryColumns.map((column, columnIndex) => (
            <div className="photos-column" key={`photo-column-${columnIndex}`}>
              {column.map((photo, rowIndex) => {
                const photoIndex = PHOTOS.indexOf(photo);

                if (photo.placeholder) {
                  return (
                    <div
                      className="photos-tile photos-tile--placeholder"
                      key={photo.id}
                      aria-hidden="true"
                      style={{
                        '--photo-aspect': `${photo.width} / ${photo.height}`,
                        '--photo-reveal-row': rowIndex,
                        '--photo-reveal-column': columnIndex,
                      }}
                    />
                  );
                }

                return (
                  <button
                    className={`photos-tile photos-tile--${photo.id}`}
                    type="button"
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    aria-label={`Open photo: ${photo.alt}`}
                    style={{
                      '--photo-aspect': photo.aspect || `${photo.width} / ${photo.height}`,
                      '--photo-reveal-row': rowIndex,
                      '--photo-reveal-column': columnIndex,
                    }}
                  >
                    <img
                      src={getPreviewSrc(photo.src)}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading="eager"
                      fetchPriority={photoIndex < 6 ? 'high' : 'auto'}
                      decoding="async"
                      style={{
                        objectPosition: photo.position,
                        '--photo-filter': photo.filter || 'none',
                      }}
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </section>
      </div>

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
            style={{ '--photo-filter': selectedPhoto.filter || 'none' }}
          />
        </div>,
        document.body,
      )}
    </main>
  );
};

export default Photos;
