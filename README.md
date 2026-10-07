# Club Glemm

Mobiele Nederlandse website met YouTube-livestream, mediaarchief en Mux-video’s.

## Lokaal

Node.js 22.12+.

```sh
npm install
npm run dev
```

Open http://localhost:5173. De server bindt lokaal op 127.0.0.1.

```sh
npm run check:content
npm run build
npm run preview
```

`dist/` bevat de productie-build. Geen accounts, betalingen of CMS nodig om lokaal te bekijken.

## Morgen: de livestream invullen

Wijzig `public/content.json`:

```json
"event": {
  "title": "Club Glemm",
  "date": "2026-10-07",
  "startTime": "21:00",
  "endTime": "03:00",
  "location": "Bar Jan Cremer · Kramersplein 6, Gent",
  "status": "scheduled",
  "youtubeUrl": "",
  "ticketUrl": ""
}
```

De locatie en uren van de derde editie komen uit de aangeleverde poster. Vul de volledige YouTube-link of het 11-tekens video-ID in. Uren gebruiken `HH:mm`; een einduur vroeger dan het startuur verwijst naar de volgende dag. De datum stuurt alle datumlabels. Stel de status op `live` zodra de uitzending loopt en op `ended` voor de replay. De website controleert YouTube’s werkelijke broadcaststatus niet automatisch.

Zonder video-ID verschijnt een aankondiging. Met video-ID verschijnt een werkende knop die de externe speler laadt, plus een directe YouTube-link. Zet embedding aan in YouTube en test de geplande stream op het uiteindelijke domein. De echte uitzending is nog niet getest: haar link is niet aangeleverd.

Vul `brand.instagramUrl` met jullie echte HTTPS-profiel; daarmee verschijnen Instagram-links. `ticketUrl` is gereserveerd voor een latere ticketactie. Een lege contact- of providerlink wordt verborgen.

## Foto’s publiceren

Zet geoptimaliseerde foto's in `public/media/`. Voeg objecten aan `media` in `public/content.json` toe:

```json
{
  "id": "unieke-foto-id",
  "type": "photo",
  "title": "Titel van de foto of editie",
  "subtitle": "Locatie of beschrijving",
  "src": "/media/jullie-foto.webp",
  "alt": "Korte beschrijving van wat zichtbaar is"
}
```

De galerie ondersteunt vorige/volgende foto, pijltjestoetsen en Escape. Publiceer foto’s liefst als WebP/AVIF/JPEG, circa 1200–1800px langste zijde. Een CMS is een volgende fase; nu is dit de eenvoudige publicatieroute.

De hero en acht archieffoto’s gebruiken jullie eigen foto’s uit `Assets/Fotos`. De browserbestanden staan in `public/media/photos`; de originelen blijven behouden. `hero.image` / `hero.alt` bepalen de opening. Het verhaalblok is verwijderd; bestaande story-gegevens worden niet meer getoond. Het archief toont eerst vier items; de bezoeker kan de volledige selectie openen. Een optioneel `poster` met een kleine thumbnail houdt de mobiele download beperkt.

## Mux-video’s publiceren

Upload in het Mux-dashboard en voeg de **playback-ID** toe:

```json
{
  "id": "unieke-video-id",
  "type": "video",
  "provider": "mux",
  "title": "Titel van de video",
  "subtitle": "Editie / locatie",
  "playbackId": "JULLIE_PUBLIEKE_PLAYBACK_ID",
  "alt": "Beschrijving van de video",
  "duration": "12:34"
}
```

Een poster wordt automatisch via Mux opgehaald, of geef zelf `poster` mee. Een snelle eerste video kan ook via `.env.local` met `VITE_MUX_PLAYBACK_ID`; kopieer daarvoor `.env.example`. Herstart de devserver na env-wijzigingen. De speler wordt alleen bij het openen van een Mux-video geïmporteerd. Daarom waarschuwt de build over de grote afzonderlijke spelerchunk; deze zit niet in de initiële pagina-download.

Gebruik nooit `VITE_MUX_TOKEN_SECRET`: alle `VITE_`-waarden zijn publiek. Automatische uploads vragen een ingelogd beheerscherm en servercode; die zijn nog niet gebouwd. Er zijn nog geen eigen Mux playback-ID’s beschikbaar om hun video’s te testen.

## Documentatie

- `docs/research-en-plan.md`: referenties, informatiearchitectuur en fasering.
- `PRODUCT.md`: bevestigde productfeiten en open keuzes.
- `DESIGN.md`: de gerealiseerde ontwerpafspraken.
- `docs/asset-sources.json`: herkomst van beelden en fonts.

De originele assets blijven in `Assets/`. De website gebruikt alleen geoptimaliseerde versies uit `public/media/`: de 5s logoanimatie is circa 44 KB in plaats van de circa 439 MB MOV. De animatie blijft als video in het archief beschikbaar. De navbar bevat alleen een vaste donkere menuknop.

## Kinetisch navigatiemenu

De aangeleverde React-component staat in src/components/ui/sterling-gate-kinetic-navigation.tsx. GSAP en CustomEase sturen de beige schuifpanelen en tekstanimatie; kinetic-navigation.css sluit aan op de bestaande stijlen. Deze component gebruikt gewone CSS-klassen en heeft geen Tailwind- of shadcn-runtime nodig.

De navigatie gebruikt Home, Livestream/Replay en Momenten, plus ingevulde Instagram-/contactgegevens. Zes foto-thumbnails uit content.json verschijnen op 13% opacity, telkens verschillend per link en bij opnieuw openen. Foto’s laden pas zodra het menu opengaat. Toetsenbordfocus, Escape, scrollblokkering en reduced-motion worden ondersteund.

## Publicatie

De website staat op [clubglemm.com](https://clubglemm.com). [GitHub](https://github.com/6ftwardje/clubglemm) is gekoppeld aan [Netlify](https://app.netlify.com/projects/clubglemm): pushes naar `main` starten automatisch een build met `npm run build` en publiceren `dist`, volgens `netlify.toml`, met Node 22. HTTPS is actief; HTTP en www verwijzen naar https://clubglemm.com. Alleen geoptimaliseerde publieke media worden gepusht; originele Assets en lokale browser-/deploymentgegevens blijven lokaal.

DNS blijft bij Combell. De bestaande A-records voor `clubglemm.com` en `www.clubglemm.com` wijzen naar `75.2.60.5`, met TTL 300. De e-mailrecords en nameservers zijn behouden.
