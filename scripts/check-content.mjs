import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { parseContent } from "../src/lib/content.ts";

const root = resolve(import.meta.dirname, "..");
try {
  const content = parseContent(
    JSON.parse(await readFile(resolve(root, "public/content.json"), "utf8")),
  );
  const paths = [
    content.hero.image,
    ...(content.story ? [content.story.image] : []),
    ...content.media.flatMap((item) => [item.src, item.poster]).filter(Boolean),
  ];
  for (const path of paths) {
    if (path.startsWith("/"))
      await access(resolve(root, "public", path.slice(1)));
    else if (!path.startsWith("https://"))
      throw new Error(`Gebruik een /media/... pad of HTTPS-adres: ${path}`);
  }
  console.log(
    `Inhoud geldig. ${content.media.length} media-item(s), datum ${content.event.date}. Alle lokale bestanden bestaan.`,
  );
  const pending = [
    !content.event.youtubeUrl && "YouTube-link",
    !content.event.location && "locatie",
    !content.event.startTime && "startuur",
    !content.brand.instagramUrl && "Instagram-account",
  ].filter(Boolean);
  if (pending.length)
    console.log(
      `Nog aan te vullen: ${pending.join(", ")}. De website toont hiervoor de aangekondigde toestand.`,
    );
} catch (error) {
  console.error(`Inhoud controleren: ${error.message}`);
  process.exitCode = 1;
}
