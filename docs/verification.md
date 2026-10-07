# Controle — 6 oktober 2026

## Gecontroleerd

- `npm run check:content`: geldige configuratie, alle lokale mediabestanden bestaan.
- `npm run build`: TypeScript en Vite-productiebuild slagen.
- Breedtes 320, 390, 430, 768 en 1440px: geen horizontale overflow.
- Ook op 320 × 568 blijft de hero-actie boven de vaste mobiele actie.
- Het mobiele menu opent en sluit met Escape.
- Alles-, foto- en videofilters functioneren. Ontbrekende echte foto’s tonen een lege toestand.
- De aangeleverde lokale logoanimatie speelt af: 5 seconden, werkende videobesturing, geen afspeelfout.
- Het mediavenster heeft een toegankelijke naam, houdt focus vast en sluit met Escape. Focus keert terug naar de knop die het opende.
- Fotogalerij met twee tijdelijke browserfixtures: filter, volgende foto via pijltje, sluiten en focusterugkeer slagen.
- Agenda-download bevat 7 oktober als hele dag met 8 oktober als exclusieve einddatum; geen onbekend uur verzonnen.
- De kopieerroute van de deelknop is in de browser getest; systeemdelen vraagt een echte toestelcontrole.
- Tijdelijke YouTube-testconfiguratie: geen iframe vóór klik, daarna `youtube-nocookie.com` met inline playback. Speler is op mobiel 346 × 256px. Live- en replaylabels werken.
- Een officiële publieke [Mux-demovideo](https://www.mux.com/docs/guides/mux-player-web) laadt met gereedstatus, duur en daadwerkelijke playback, zonder fout. Die demovideo is niet gepubliceerd in `content.json`.
- Geforceerde fout bij het laden van `content.json`: zichtbare foutmelding; opnieuw proberen herstelt de pagina.
- Definitieve desktop- en mobiele captures na geladen fonts en gedecodeerde beelden. Alle vier zichtbare image-elementen geladen.
- Bewegingsvoorkeur wordt gerespecteerd; logo-autoplay stopt na één ident en wordt overgeslagen bij reduced-motion/data-saver.
- Drie shipping rasters dragen bronmetadata; provenance-scan meldt nul ontbrekende bronnen.

## Bewuste beperkingen

- De echte livestream en eigen Mux-video’s zijn nog niet beschikbaar. Hun accountinstellingen en playback moeten vóór de uitzending op het publieke domein getest worden.
- De browsertest gebruikt Chromium. Safari, Android en de Instagram-browser vragen nog een echte toestelcontrole na hosting.
- `status` is een redactioneel ingestelde waarde; er is geen automatische YouTube-statusmonitor.
- Content publiceren gebeurt via JSON en mediabestanden. Er is geen CMS/uploadbackend, ticketcheckout of mailinglijst gebouwd.
- De stock-hero is een gemarkeerd tijdelijk sfeerbeeld.
- Mux zit in een aparte grote spelerchunk (circa 317 KB gzip), die pas bij het openen van een Mux-video wordt geladen. De buildwaarschuwing heeft geen betrekking op de eerste paginalaad.
- De design-detector rapporteerde één smaakwaarschuwing voor Space Grotesk; de font is bewust beperkt tot informatie en tekst, terwijl het originele logo de merkexpressie levert.

Screenshots: `.impeccable/review/desktop.png`, `mobile.png` en `output/playwright/*-hero.png`. Onderzoeksbeelden: `output/playwright/research-*.png`. De tijdelijke QA-gegevens wijzigden de publieke configuratie niet. De enige fout in de testconsole was de bewust geïnjecteerde HTTP500 voor de herstelcontrole.

## Ontwerpcontrole

De onafhankelijke finish-review vond drie concrete punten: ontbrekend startuurlabel, desktopnavigatiecontrast over fotografie en een overlap tussen logo en tekst in de mobiele streamplaceholder. Die zijn in één correctieronde aangepakt.

De vervolgbeoordeling scoort alle drie als opgelost: het navigatiecontrast meet op de eerdere probleemplekken 9,56–14,05:1, de lege starttijd toont “Startuur volgt” en de mobiele logo/caption-afstand is 24px. Dispositie: `ship` voor de drie gescoorde correcties, zonder zichtbare regressies daarvan. Het rapport staat in `.impeccable/review/verdict.md`.

## Revisie van 6 oktober 2026: fonts, rood en eigen foto's

- Gebruikerskeuze: Urbanist voor titels/uitnodigingen, Open Sans voor lopende tekst en controls. Beide variabele Latin-fonts lokaal gehost (400–700) met licenties; de browser bevestigt dat ze geladen zijn.
- Alle Sparkles-/stericonen en bijbehorende stijlen verwijderd. Accent overal #e21b1c, hover #c91617, Mux en favicon inbegrepen. Witte tekst op rood meet 4,765:1; warm papier op inkt blijft behouden. Kleine hover-/live-tekst blijft papierkleurig met rode onderstreping of icoon.
- Eigen foto's vervangen de stock-hero; acht archieffoto's en één verhaalbeeld toegevoegd. WebP-thumbnails beperken de mobiele download, volledige foto's laden in de viewer. Originelen blijven in Assets/Fotos. Herkomstscan: 20 rasters, nul ontbrekende provenance.
- Browsercontrole: geen horizontale overflow op 320, 390, 430, 768 en 1440px. Hero-actie blijft boven de vaste mobiele balk, ook op 320×568.
- Archief: 4 → 9 → 4 items; focus blijft bij de uitbreidknop. Foto-filter: 8 foto's; video-filter: 1 video. Volledige foto geladen, volgende/vorige/doorlopen, Escape en focusherstel werken. Mobiel menu opent en sluit met Escape. Geen pageerrors.
- Verhaalbeeld bevestigd op 3:2: 510×340 desktop en 346×230,66 mobiel. Alle zichtbare foto's geladen; geen gebroken beelden.
- npm run build en npm run check:content geslaagd. Mux blijft een afzonderlijk, pas bij gebruik geladen component.
- Definitieve screenshots: .impeccable/review/revision-desktop.png en revision-mobile.png. Eén ongeldige desktopcapture met herhaalde hero-tegels is vervangen na viewportinstelling en herladen; de definitieve opname toont de volledige pagina correct.
- Onafhankelijke finish-review: disposition `ship` voor deze revisie. Typografie, eigen fotografie, exacte accentkleur en verwijderde stericonen komen overeen met de gebruikersvraag; geen nieuw materieel probleem gevonden. Rapport: .impeccable/review/revision-review.md.

## Pastelwereld en vrouwelijke doelgroep (6 oktober 2026)

- Laatste gebruikersvraag vervangt de donkere rode stijl door pastel en warme neutrale tonen, met copy gericht op vrouwen. De layout, functies, fonts en regel zonder stericonen blijven behouden.
- Nieuwe tokens: crème #fbf7f2, cacao #40312f, oudroze #e7c7c6, salie #e7ebe2 en zand #efe6dc. Donkere tekst op crème meet 11,59:1 en op oudroze 7,88:1. Ondersteunende tekst op salie 4,71:1 en op zand 4,61:1.
- Eigen champagnefoto in de opening, vrouwen en samen vieren in de eerste archiefselectie. Het aangeleverde beeldmerk en de hero-ident krijgen alleen een neutrale CSS-presentatie; originele bestanden en archiefvideo zijn behouden.
- Copy nodigt uit tot een avond met vriendinnen en een outfit waarin je je mooi voelt. Er wordt geen exclusieve toegangsregel voor vrouwen of nieuwe servicebelofte toegevoegd. Meta-/sharetekst sluiten aan bij deze stem.
- Browsercontrole: 320, 390, 430, 768 en 1440px zonder horizontale overflow; livestreamactie blijft boven de mobiele balk. Fontrollen bevestigd. Galerij uitbreiden/inklappen, foto wisselen, Escape/focusherstel en mobiel menu werken. Geen pageerrors. Logoanimatie speelt met de neutrale blend/filter; reduced-motion gebruikt de statische vorm.
- npm run build en npm run check:content slagen. Herkomstscan: 18 shipping rasters, nul ontbrekende vermeldingen. Twee vervangen ongebruikte browserafgeleiden verwijderd; originelen blijven in Assets.
- Valid screenshots: .impeccable/review/pastel-desktop.png en pastel-mobile.png; hero-detail en animatiemoment in output/playwright/pastel-*.png.
- Onafhankelijke review van deze pastelwereld: disposition `ship`. Alle vijf captures geldig; typografie, kleurwereld, vrouwgerichte copy en behouden layout passen bij de vraag. Geen materiële verbeterpunten genoemd. Scope-rapport: .impeccable/review/pastel-review.md. De latere sourcewijzigingen betroffen alleen CSS-regelafbrekingen en een niet-getoonde Mux-fallbacktitel; zichtbare pagina blijft gelijk aan de captures.

## Vereenvoudiging (7 oktober 2026)

- Op verzoek veel minder tekst: korte hero-uitnodiging, Livestream/Replay en Momenten. Het jurkverhaal, de bewegende tekstband, de afsluitende uitnodiging en galerijcaptions zijn verwijderd. Titels en alt-tekst blijven beschikbaar voor toegankelijke controls en de viewer.
- De aangeleverde ident speelt gedempt en inline op loop linksboven in de navbar. De browser bevestigt een duur van 5 seconden, herstart aan het einde en geen videofout. Hero en footer gebruiken het statische logo. Reduced-motion toont de statische fallback; terugschakelen hervat de animatie.
- Browsercontrole op 320, 390, 430, 768 en 1440px: geen horizontale overflow; hero-actie blijft boven de vaste mobiele balk. Alle interne ankerlinks verwijzen naar een bestaand onderdeel.
- Galerij 4 → 9 → 4, foto-/videofilters, fotowissel, Escape en focusherstel slagen. Mobiel menu opent, sluit en herstelt focus. Geen pageerrors.
- npm run build en npm run check:content slagen. De bestaande Mux-chunkwaarschuwing betreft de pas bij gebruik geladen speler.
- Visueel gecontroleerd: output/playwright/simple-desktop.png, simple-mobile.png en simple-navbar-animation.png. De mechanische detector gaf alleen bestaande advisories voor CSS-waarden buiten de compacte documentatieramp; de goedgekeurde kleuren en maten blijven behouden. Dispositie: ship voor de gevraagde vereenvoudiging.

## Beige en Glemm-rood, naar de eventposter (7 oktober 2026)

- De poster bepaalt beige #f0ebe2, warm beige #e9e1d5 en zand #e1d8cb, met donkere inkt #25221f. Roze en salie zijn vervangen; Glemm-rood #e21b1c blijft beperkt tot acties en details. Kleine rode tekst gebruikt #bd181b; witte tekst op rode controls #fffaf5. Navbar, mobiele balk, viewer, Mux-kleuren en favicon sluiten aan.
- Posterfeiten overgenomen: derde editie, 7 oktober 2026, Bar Jan Cremer, Kramersplein 6 in Gent, 21:00–03:00. Optioneel endTime is gevalideerd en wordt samen met het startuur getoond. Agenda-download behoudt de bestaande hele-dag-entry met uren en locatie in de inhoud.
- Contrast: donkere tekst/beige 13,33:1; secundaire tekst/warm beige 5,22:1; secundaire tekst/zand 4,80:1; rode tekst/beige 5,34:1; knoptekst/rood 4,59:1, hover 5,61:1.
- Build en contentcontrole slagen. Browsercontrole op 320, 390, 430, 768 en 1440px zonder horizontale overflow; hero-actie blijft boven de mobiele balk. Eventgegevens, logo-loop, reduced-motion/focusterugkeer, filters, galerij en menu gecontroleerd, zonder pageerrors.
- Visueel gecontroleerd in één ronde: output/playwright/beige-desktop.png, beige-mobile.png en beige-navbar-animation.png. Geen materiële defecten in de gecontroleerde scope; dispositie ship. Detectorresultaat bewaard in output/playwright/beige-design-scan.json.

## Kinetisch menu met Glemm-foto’s (7 oktober 2026)

- De aangeleverde React-component is geïntegreerd met GSAP/CustomEase en de bestaande CSS-structuur. Drie beige panelen schuiven binnen, links verschijnen na elkaar en de rode plus draait bij openen. De logoanimatie blijft linksboven op loop.
- Zes eigen WebP-foto’s vervangen de abstracte vormen. Ze laden pas bij het openen van het menu en kruisen op 13% opaciteit bij hover, toetsenbordfocus en een volgende opening. Geen nieuwe stockbeelden of rasters toegevoegd.
- Browsercontrole op 320×568, 390×844, 430×932, 768×1024, 844×390 en 1440×1000: geen horizontale overflow; links en headeracties blijven bereikbaar. Desktop en mobiel visueel gecontroleerd in één gezamenlijke ronde.
- Escape, achtergrondklik, focusherstel, Tab/Shift+Tab-focusbegrenzing, scrollblokkering en inert pagina-inhoud werken. Interne links sluiten het menu en verplaatsen focus naar het gekozen onderdeel. Snel openen/sluiten/openen onderbreekt de animatie zonder vastgelopen toestand.
- Reduced-motion slaat de schuifbeweging over. Foto’s wisselen ook zonder beweging. Galerij uitbreiden/inklappen en viewer met Escape blijven werken. Geen pageerrors of consolewaarschuwingen in de browsertest.
- npm run build en npm run check:content slagen. De bestaande, afzonderlijk geladen Mux-chunk behoudt zijn buildwaarschuwing.
- Screenshots: output/playwright/kinetic-desktop-menu.png, kinetic-mobile-menu.png en kinetic-mobile-hero.png. Geen materiële defecten in de gecontroleerde scope; dispositie ship. Detectorresultaat: output/playwright/kinetic-design-scan.json, alleen advisories voor expliciete CSS-maten buiten de compacte documentatieramp; de afgestemde typografie blijft behouden.

## Transparante, vaste navbar (7 oktober 2026)

- Navbarachtergrond en onderrand verwijderd; position: fixed houdt de navbar op top: 0 bij scrollen. Mobiele ankerafstand verhoogd naar 92px, boven de navbarhoogte van 76px.
- Browsercontrole op 1440×1000, 390×844 en 320×568 bevestigt transparantie, afwezige onderrand, vaste positie vóór/na scrollen en geen horizontale overflow. Menu openen vanaf een gescrolde positie, Escape en de datumlink blijven werken; ankerbestemming staat onder de navbar.
- Desktop en mobiel samen visueel gecontroleerd: output/playwright/transparent-navbar-1440-top.png, transparent-navbar-1440-scrolled.png, transparent-navbar-390-top.png en transparent-navbar-390-scrolled.png.
- npm run build slaagt. Detector: output/playwright/transparent-navbar-design-scan.json; alleen 35 bestaande advisories over CSS-maten. Dispositie: ship voor de gevraagde transparantie en vaste positie.

## Eén zichtbare menuknop en publicatie (7 oktober 2026)

- Navbarlogo en datum-/ticketactie verwijderd. De vaste transparante header bevat alleen een donkere menuknop van minimaal 48px, met beige tekst en rood icoon. Lege delen van de header laten paginaklikken door.
- Build en contentcontrole slagen. Browsercontrole op 1440×1000, 390×844 en 320×568: geen overflow, knop blijft bovenaan na scrollen, menulinks en Escape werken, Tab/Shift+Tab blijven begrensd en interne links herstellen bestemmingsfocus. Reduced-motion werkt.
- Desktop en mobiel samen visueel gecontroleerd: output/playwright/menu-only-1440.png en menu-only-390.png. Detector toont alleen 35 advisories over CSS-maten; geen primaire bevindingen. Dispositie: ship voor deze navbarwijziging.
- netlify.toml legt npm run build, dist en Node 22 vast. Bronmedia, lokale screenshots, caches en Netlify-authgegevens zijn uitgesloten van Git.

### Productiecontrole

- Gepusht naar 6ftwardje/clubglemm op main; eerste publicatiecommit 9a731c2. Netlify-project clubglemm (84c93016-5b5d-47bd-ad84-29d511dec749) deployt automatisch vanuit deze repo.
- clubglemm.com en www.clubglemm.com zijn gekoppeld. De web-A-records bij Combell wijzen naar 75.2.60.5 met TTL 300; nameservers, FTP en e-mailrecords zijn behouden. Alle drie Combell-nameservers en resolver 1.1.1.1 geven het nieuwe webadres terug.
- https://clubglemm.com geeft HTTP 200 met geldig TLS; HTTPS is ook bevestigd in Netlify met een automatisch vernieuwd Let’s Encrypt-certificaat voor beide namen. www en HTTP geven 301 naar https://clubglemm.com/.
- Productie gebruikt exact de lokaal gecontroleerde JS- en CSS-assets. De publieke contentconfiguratie bevat de derde editie en 9 media-items. De site is in de browser op het eigen domein geladen en visueel bevestigd.
