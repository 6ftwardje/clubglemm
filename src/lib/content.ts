export type MediaItem = {
  id: string;
  type: "photo" | "video";
  provider?: "local" | "mux";
  title: string;
  subtitle?: string;
  src?: string;
  poster?: string;
  playbackId?: string;
  duration?: string;
  alt: string;
};

export type Content = {
  brand: { name: string; instagramUrl: string; contactEmail: string };
  event: {
    title: string;
    date: string;
    startTime: string;
    endTime?: string;
    location: string;
    status: "scheduled" | "live" | "ended";
    youtubeUrl: string;
    ticketUrl: string;
  };
  hero: { image: string; alt: string; isPlaceholder: boolean };
  story?: { image: string; alt: string; caption?: string };
  media: MediaItem[];
};

export function youtubeId(value: string): string | null {
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = url.pathname.slice(1);
    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      id =
        url.searchParams.get("v") ||
        url.pathname.match(/^\/(?:live|embed|shorts)\/([^/]+)/)?.[1] ||
        null;
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function externalUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function eventDate(date: string) {
  return new Date(`${date}T12:00:00+02:00`);
}

export function longDate(date: string) {
  return eventDate(date).toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Brussels",
  });
}

export function dayMonth(date: string) {
  return eventDate(date).toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Brussels",
  });
}

export function shortDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year.slice(2)}`;
}

export function parseContent(value: unknown): Content {
  const c = value as Content;
  if (!c || !c.brand || !c.event || !c.hero || !Array.isArray(c.media))
    throw new Error("De inhoud ontbreekt.");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(c.event.date) ||
    Number.isNaN(eventDate(c.event.date).valueOf()) ||
    eventDate(c.event.date).toISOString().slice(0, 10) !== c.event.date
  ) {
    throw new Error("De eventdatum is ongeldig.");
  }
  if (!["scheduled", "live", "ended"].includes(c.event.status))
    throw new Error("De livestreamstatus is ongeldig.");
  if (c.event.startTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(c.event.startTime))
    throw new Error("Het startuur is ongeldig.");
  if (c.event.endTime && (!c.event.startTime || !/^([01]\d|2[0-3]):[0-5]\d$/.test(c.event.endTime)))
    throw new Error("Het einduur is ongeldig.");
  if (!c.hero.image || typeof c.hero.alt !== "string")
    throw new Error("Het sfeerbeeld ontbreekt.");
  if (c.story && (!c.story.image || typeof c.story.alt !== "string"))
    throw new Error("Het verhaalbeeld is ongeldig.");
  if (c.event.youtubeUrl && !youtubeId(c.event.youtubeUrl))
    throw new Error("De YouTube-link is ongeldig.");
  if (c.event.ticketUrl && !externalUrl(c.event.ticketUrl))
    throw new Error("De ticketlink is ongeldig.");
  if (c.brand.instagramUrl && !externalUrl(c.brand.instagramUrl))
    throw new Error("De Instagram-link is ongeldig.");
  const ids = new Set<string>();
  for (const item of c.media) {
    if (
      !item.id ||
      ids.has(item.id) ||
      !item.title ||
      typeof item.alt !== "string" ||
      !["photo", "video"].includes(item.type)
    )
      throw new Error("Een media-item is ongeldig.");
    if (item.type === "photo" && !item.src)
      throw new Error("Een fotobestand ontbreekt.");
    if (item.type === "video" && !(item.src || item.playbackId))
      throw new Error("Een videobestand of playback-ID ontbreekt.");
    if (item.provider === "mux" && !item.playbackId)
      throw new Error("Een Mux playback-ID ontbreekt.");
    ids.add(item.id);
  }
  return c;
}
