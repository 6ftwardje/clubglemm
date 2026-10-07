import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Play,
  Radio,
  Share2,
} from "lucide-react";
import MediaDialog from "./components/MediaDialog";
import KineticNavigation, { type NavigationLink } from "./components/ui/sterling-gate-kinetic-navigation";
import {
  downloadCalendar,
  externalUrl,
  longDate,
  parseContent,
  shortDate,
  youtubeId,
  type Content,
  type MediaItem,
} from "./lib/content";

type Filter = "all" | "photo" | "video";

function usePageMotion(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ready]);
}

function BrandLogo({
  className,
  animated = false,
}: {
  className: string;
  animated?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!animated) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const updatePlayback = () => {
      if (reduced.matches || connection?.saveData || document.hidden) {
        video.current?.pause();
        setPlaying(false);
      } else {
        video.current?.play().catch(() => setPlaying(false));
      }
    };
    updatePlayback();
    reduced.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      reduced.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [animated]);
  return (
    <span className={`brand-logo ${className} ${playing ? "is-playing" : ""}`}>
      <img
        src="/media/glemm-logo-white.png"
        alt="Club Glemm"
        width="960"
        height="716"
        fetchPriority="high"
      />
      {animated && (
        <video
          ref={video}
          src="/media/glemm-logo-animation.mp4"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setPlaying(false)}
        />
      )}
    </span>
  );
}

function Broadcast({ content }: { content: Content }) {
  const { event } = content;
  const id = youtubeId(event.youtubeUrl);
  const [loadPlayer, setLoadPlayer] = useState(false);
  const [shared, setShared] = useState("");
  const isLive = event.status === "live" && Boolean(id);
  const label = isLive
    ? "We zijn live"
    : event.status === "ended"
      ? "Replay"
      : event.title;
  const date = longDate(event.date);

  useEffect(() => {
    setLoadPlayer(false);
  }, [id]);

  async function share() {
    const url = `${window.location.origin}${window.location.pathname}#live`;
    try {
      if (navigator.share)
        await navigator.share({
          title: "Club Glemm",
          text: `Club Glemm — ${date}.`,
          url,
        });
      else {
        await navigator.clipboard.writeText(url);
        setShared("Link gekopieerd");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setShared(`Deel deze link: ${url}`);
    }
  }

  return (
    <section
      id="live"
      tabIndex={-1}
      className="broadcast section-pad"
      aria-labelledby="broadcast-heading"
    >
      <div className="section-heading reveal">
        <div>
          <h2 id="broadcast-heading">
            {event.status === "ended" ? "Replay" : "Livestream"}
          </h2>
        </div>
        <div className="event-summary">
          <span className={`status ${isLive ? "is-live" : ""}`}>
            <Radio size={16} />
            {label}
          </span>
          <p>
            <time dateTime={event.date}>{date}</time>
            {event.startTime && (
              <span>
                {event.endTime
                  ? `${event.startTime}–${event.endTime}`
                  : `Vanaf ${event.startTime}`}
              </span>
            )}
          </p>
          {event.location && <span className="location">{event.location}</span>}
        </div>
      </div>
      <div className="broadcast-player reveal">
        {loadPlayer && id ? (
          <iframe
            title={`${event.status === "ended" ? "Replay" : "Livestream"} Club Glemm — ${date}`}
            src={`https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="broadcast-cover">
            <img
              src="/media/glemm-logo-white.png"
              alt=""
              width="960"
              height="716"
              loading="lazy"
            />
            <div className="broadcast-cover-caption">
              <div>
                <h3>
                  {id
                    ? event.status === "ended"
                      ? "Kijk terug."
                      : "Kijk mee."
                    : event.status === "ended"
                      ? "Replay volgt."
                      : "Livestream volgt."}
                </h3>
              </div>
              {id ? (
                <button
                  className="play-button"
                  onClick={() => setLoadPlayer(true)}
                  aria-label="YouTube-speler laden"
                >
                  <Play size={26} fill="currentColor" />
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <div className="broadcast-actions">
        <div className="inline-actions">
          <button
            className="text-action"
            onClick={() => downloadCalendar(event)}
          >
            <CalendarDays size={18} />
            Bewaar de datum
            <ArrowUpRight size={16} />
          </button>
          <button className="text-action" onClick={share}>
            {shared === "Link gekopieerd" ? (
              <Check size={18} />
            ) : (
              <Share2 size={18} />
            )}
            Delen
          </button>
        </div>
        {id ? (
          <a
            className="text-action"
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.status === "ended" ? "Bekijk op YouTube" : "Open op YouTube"}
            <ArrowUpRight size={17} />
          </a>
        ) : null}
      </div>
      {shared && (
        <p className="share-message" role="status">
          {shared}
        </p>
      )}
    </section>
  );
}

function MediaArchive({ content }: { content: Content }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const envPlaybackId = import.meta.env.VITE_MUX_PLAYBACK_ID?.trim();
  const items: MediaItem[] = [...content.media];
  if (envPlaybackId && !items.some((item) => item.playbackId === envPlaybackId))
    items.push({
      id: "event-replay",
      type: "video",
      provider: "mux",
      title: "Nog even nagenieten.",
      playbackId: envPlaybackId,
      alt: "Club Glemm-video",
      subtitle: "Herbeleef Club Glemm.",
    });
  const visible = items.filter(
    (item) => filter === "all" || item.type === filter,
  );
  const photos = items.filter((item) => item.type === "photo");
  const displayed = expanded ? visible : visible.slice(0, 4);

  return (
    <section
      id="momenten"
      tabIndex={-1}
      className="archive section-pad"
      aria-labelledby="archive-heading"
    >
      <div className="section-heading reveal">
        <div>
          <h2 id="archive-heading">Momenten</h2>
        </div>
        <div
          className="media-filters"
          role="group"
          aria-label="Filter momenten"
        >
          {(
            [
              ["all", "Alles"],
              ["photo", "Foto’s"],
              ["video", "Video’s"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              aria-pressed={filter === value}
              className={filter === value ? "active" : ""}
              onClick={() => {
                setFilter(value);
                setExpanded(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div id="archive-items" className={`media-layout ${visible.length > 1 ? "has-many" : ""}`}>
        {displayed.map((item) => (
          <button
            className={`media-item ${item.id === "glemm-ident" ? "is-ident" : ""}`}
            key={item.id}
            onClick={(event) => {
              opener.current = event.currentTarget;
              setSelected(item);
            }}
            aria-label={`${item.type === "video" ? "Bekijk video" : "Open foto"}: ${item.title}`}
          >
            <div className="media-thumbnail">
              <img
                src={
                  item.poster ||
                  (item.provider === "mux"
                    ? `https://image.mux.com/${item.playbackId}/thumbnail.jpg?width=960&fit_mode=preserve`
                    : item.src)
                }
                alt={item.alt}
                loading="lazy"
              />
              <span className="media-type">
                {item.type === "video" ? "FILM" : "FOTO"}
                {item.duration && ` / ${item.duration}`}
              </span>
              <span className="media-open">
                {item.type === "video" ? (
                  <Play size={25} fill="currentColor" />
                ) : (
                  <ArrowUpRight size={28} />
                )}
              </span>
            </div>
          </button>
        ))}
        {photos.length === 0 && filter !== "video" && (
          <div className="archive-waiting">
            <h3>Foto’s volgen.</h3>
          </div>
        )}
        {visible.length === 0 &&
          !(photos.length === 0 && filter !== "video") && (
            <div className="empty-media">
              <h3>{filter === "video" ? "Video’s" : "Momenten"} volgen.</h3>
            </div>
          )}
      </div>
      {visible.length > 4 && (
        <div className="archive-more">
          <button
            className="button"
            aria-expanded={expanded}
            aria-controls="archive-items"
            onClick={(event) => {
              const button = event.currentTarget;
              setExpanded(!expanded);
              if (expanded) {
                requestAnimationFrame(() =>
                  button.scrollIntoView({ block: "nearest" }),
                );
              }
            }}
          >
            {expanded ? "Toon minder" : "Bekijk alles"}
            {expanded ? <ArrowUpRight size={20} /> : <ArrowDown size={20} />}
          </button>
        </div>
      )}
      {selected && (
        <MediaDialog
          item={selected}
          photos={photos}
          onClose={() => {
            setSelected(null);
            requestAnimationFrame(() =>
              opener.current?.focus({ preventScroll: true }),
            );
          }}
          onNavigate={setSelected}
        />
      )}
    </section>
  );
}

export default function App() {
  const [content, setContent] = useState<Content | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  usePageMotion(Boolean(content));

  useEffect(() => {
    const controller = new AbortController();
    setError(false);
    fetch("/content.json", { cache: "no-cache", signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Inhoud niet geladen");
        return response.json();
      })
      .then((value) => setContent(parseContent(value)))
      .catch((reason) => {
        if (reason.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, [attempt]);

  if (!content)
    return (
      <main className="initial-state">
        <img src="/media/glemm-logo-white.png" alt="Club Glemm" />
        {error ? (
          <>
            <p>De pagina kon niet worden geladen.</p>
            <button
              className="button button-accent"
              onClick={() => setAttempt((value) => value + 1)}
            >
              Probeer opnieuw
              <ArrowRight size={20} />
            </button>
          </>
        ) : (
          <p role="status">Laden…</p>
        )}
      </main>
    );

  const instagram = externalUrl(content.brand.instagramUrl);
  const isLive =
    content.event.status === "live" &&
    Boolean(youtubeId(content.event.youtubeUrl));
  const liveAction = isLive
    ? "Kijk live"
    : content.event.status === "ended"
      ? "Bekijk de replay"
      : "Livestream";
  const navigationLinks: NavigationLink[] = [
    { label: "Home", href: "#top" },
    { label: content.event.status === "ended" ? "Replay" : "Livestream", href: "#live" },
    { label: "Momenten", href: "#momenten" },
    ...(instagram ? [{ label: "Instagram", href: instagram, external: true }] : []),
    ...(content.brand.contactEmail ? [{ label: "Contact", href: "mailto:" + content.brand.contactEmail }] : []),
  ];

  return (
    <>
      <a className="skip-link" href="#live" inert={menuOpen}>
        Naar de livestream
      </a>
      <KineticNavigation
        links={navigationLinks}
        photos={content.media
          .filter((item) => item.type === "photo")
          .map((item) => item.poster || item.src!)
          .slice(0, 6)}
        onOpenChange={setMenuOpen}
      />

      <main inert={menuOpen}>
        <section
          id="top"
          tabIndex={-1}
          className="hero"
          aria-label="Club Glemm, de volgende editie"
        >
          <img
            className="hero-photo"
            src={content.hero.image}
            alt={content.hero.alt}
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <h1 className="hero-brand">
              <BrandLogo className="hero-logo" />
            </h1>
            <p className="hero-invitation">
              Een avond samen.
            </p>
            <div className="hero-actions">
              <a className="button button-accent" href="#live">
                {liveAction}
                <ArrowUpRight size={21} />
              </a>
              <span className="hero-date">
                <time dateTime={content.event.date}>
                  {shortDate(content.event.date)}
                </time>
                {isLive && <span>Nu live</span>}
              </span>
            </div>
          </div>
          <div className="hero-bottom">
            {content.hero.isPlaceholder && (
              <span className="preview-credit">
                Tijdelijk sfeerbeeld / eigen foto’s volgen
              </span>
            )}
            <a
              href="#live"
              className="hero-scroll"
              aria-label="Scroll naar de livestream"
            >
              <ArrowDown size={21} />
            </a>
          </div>
        </section>

        <Broadcast content={content} />
        <MediaArchive content={content} />
      </main>

      <footer className="footer section-pad" inert={menuOpen}>
        <a className="brand-link" href="#top" aria-label="Club Glemm, naar boven">
          <BrandLogo className="nav-logo" />
        </a>
        <div className="footer-links">
          <a href="#live">Livestream</a>
          <a href="#momenten">Momenten</a>
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              Instagram
              <ArrowUpRight size={14} />
            </a>
          )}
          {content.brand.contactEmail && (
            <a href={`mailto:${content.brand.contactEmail}`}>
              Contact
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
        <span className="copyright">
          © {new Date().getFullYear()} Club Glemm
        </span>
        <a className="back-top" href="#top">
          Terug naar boven
          <ArrowUpRight size={17} />
        </a>
      </footer>
      <div className="mobile-live-bar" inert={menuOpen}>
        <span>
          <time dateTime={content.event.date}>
            {shortDate(content.event.date)}
          </time>
          {isLive ? " · Nu live" : " · Club Glemm"}
        </span>
        <a href="#live">
          {isLive
            ? "Kijk live"
            : content.event.status === "ended"
              ? "Replay"
              : "Livestream"}
          <ArrowUpRight size={17} />
        </a>
      </div>
    </>
  );
}
