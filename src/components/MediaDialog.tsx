import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { MediaItem } from "../lib/content";

const MuxVideo = lazy(() => import("./MuxVideo"));

export default function MediaDialog({
  item,
  photos,
  onClose,
  onNavigate,
}: {
  item: MediaItem;
  photos: MediaItem[];
  onClose: () => void;
  onNavigate: (item: MediaItem) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [failed, setFailed] = useState(false);
  const index = photos.findIndex((photo) => photo.id === item.id);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    setFailed(false);
  }, [item.id]);

  function navigate(offset: number) {
    if (photos.length > 1 && index >= 0)
      onNavigate(photos[(index + offset + photos.length) % photos.length]);
  }

  return (
    <dialog
      ref={dialog}
      className="media-dialog"
      aria-label={item.title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (item.type === "photo" && event.key === "ArrowLeft") navigate(-1);
        if (item.type === "photo" && event.key === "ArrowRight") navigate(1);
      }}
    >
      <div className="dialog-top">
        <p id="media-title">{item.title}</p>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Sluiten"
          autoFocus
        >
          <X size={23} />
        </button>
      </div>
      <div className="dialog-media">
        {failed ? (
          <div className="media-error" role="alert">
            <p>Dit bestand kan niet worden geladen.</p>
            <button
              className="button button-light"
              onClick={() => setFailed(false)}
            >
              Probeer opnieuw
            </button>
          </div>
        ) : item.type === "photo" ? (
          <img
            key={item.id}
            src={item.src}
            alt={item.alt}
            onError={() => setFailed(true)}
          />
        ) : item.provider === "mux" ? (
          <Suspense
            fallback={
              <p className="player-loading" role="status">
                De video wordt geladen…
              </p>
            }
          >
            <MuxVideo key={item.id} item={item} />
          </Suspense>
        ) : (
          <video
            key={`${item.id}-${failed}`}
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={item.title}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className="dialog-bottom">
        <p>
          {item.subtitle ||
            (item.type === "photo"
              ? "Club Glemm — mooie avonden om samen te bewaren."
              : "Club Glemm — in beeld.")}
        </p>
        {item.type === "photo" && photos.length > 1 && (
          <div className="photo-controls">
            <button
              className="icon-button"
              onClick={() => navigate(-1)}
              aria-label="Vorige foto"
            >
              <ArrowLeft size={22} />
            </button>
            <span>
              {index + 1} / {photos.length}
            </span>
            <button
              className="icon-button"
              onClick={() => navigate(1)}
              aria-label="Volgende foto"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
