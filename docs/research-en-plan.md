# Club Glemm — research en bouwplan

Onderzocht op 6 oktober 2026. Komende editie: 7 oktober 2026.

## De beste referenties

| Referentie | Wat werkt voor Glemm | Wat we toepassen |
| --- | --- | --- |
| [Glitterbox](https://glitterboxibiza.com/) · [het concept](https://glitterboxibiza.com/about) | Het merk reist tussen locaties; de site houdt events, muziek, nieuws en verhaal bij elkaar. De combinatie van feestidentiteit en content sluit aan bij Glemm. | Eén herkenbare identiteit over alle edities, met het volgende event en een groeiend mediaarchief. We beperken de navigatie tot wat nu nuttig is. |
| [Boiler Room](https://boilerroom.tv/) | Events en video zijn afzonderlijke, duidelijk benoemde hoofdingangen; het archief geeft content waarde na de avond. | Een rechtstreeks bereikbare stream en een foto-/videoarchief. De site blijft relevant tussen twee events. |
| [Pacha](https://pacha.com/) | Aankomende events, datum, line-up en ticketactie staan dicht bij elkaar. De merkidentiteit is herkenbaar terwijl bezoekers naar een concrete editie gaan. | Eén eventconfiguratie met datum, locatie, stream en later ticketlink. Tickets krijgen pas een actie wanneer er een echte verkooplink is. |
| [Cercle](https://www.cercle.io/) | Muziek, locaties en video vormen samen het merk. De hoofdnavigatie biedt directe routes naar video en eventconcepten. | Content als hoofdonderdeel van de ervaring; later kunnen grotere albums of edities hun eigen pagina krijgen. |

De structuur en inhoud zijn via de officiële sites onderzocht. De eerste mobiele schermen zijn ook in een browser bekeken; screenshots staan in `output/playwright/research-*.png`. Bij Glitterbox en Pacha namen toestemmingsvensters veel van het eerste scherm in. Cercle toont op mobiel een zeer directe lijst met hoofdingangen. Dat is bruikbaar als navigatieprincipe, maar voor Glemm krijgt het eigen logo meer ruimte.

**Aanbeveling:** combineer Glitterbox als eventmerk, Boiler Room als contentstructuur en Pacha’s directe eventactie. Maak het compacter dan deze referenties. Gebruik Glemm’s eigen logo, beweging, teksten en straks echte fotografie. Een grotere festival- of labelsite zou nu te veel navigatie toevoegen.

## Bevestigde keuzes

- Vooral mobiel bezoek vanuit Instagram.
- Nederlandse tekst; gedurfd en nachtelijk, met kleur en beweging.
- De livestream van 7 oktober krijgt de hoofdactie.
- React, TypeScript en Vite; hosting kiezen we later.
- Direct een werkende website bouwen, zonder voorafgaande mockupronde.
- YouTube voor de volgende livestream; Mux voor video’s op de site.
- Bestaande eventfoto’s toevoegen zodra ze in het project beschikbaar zijn.

## De eerste website

1. **Opening:** het echte Glemm-logo, de korte logoanimatie, datum en knop naar de livestream. Het tijdelijke stockbeeld is expliciet gemarkeerd.
2. **Livestream:** duidelijke aangekondigde/live/replay-toestand, datum en locatie, speler na klik, directe YouTube-uitweg, datum bewaren en link delen.
3. **Momenten:** filter op foto’s en video’s; foto’s openen met vorige/volgende navigatie, video’s spelen in een toegankelijk venster. De aangeleverde logoanimatie is het eerste echte video-item.
4. **Het verhaal:** Gent, Bar Jan Cremer, glamorous, de bijzondere outfit en de ervaring.
5. **Volgende stap:** Instagram wanneer het account is ingevuld; tot dan datum bewaren. Op mobiel blijft een compacte livestreamactie bereikbaar.

## Technische aanpak

### YouTube voor morgen

Gebruik het video-ID van de geplande livestream. Een vaste eventvideo is eenvoudiger te controleren dan een algemene kanaal-embed. De site aanvaardt een video-ID, `youtube.com/watch`, `youtu.be` of `youtube.com/live`-link.

De ingebouwde speler gebruikt `youtube-nocookie.com`, wordt pas na klik geladen, speelt inline op iOS en heeft een fullscreenoptie. Een gewone YouTube-link blijft beschikbaar als de Instagram-browser de embed moeilijk afspeelt. De speler blijft minstens 200 × 200 pixels, conform de [officiële spelervereisten](https://developers.google.com/youtube/player_parameters). De privacyverbeterde embed staat beschreven in [YouTube Help](https://support.google.com/youtube/answer/171780?hl=en); het is geen garantie dat YouTube na interactie geen gegevens verwerkt.

Voor de uitzending: geplande video aanmaken, embed toestaan, dezelfde video-ID in een repetitie testen, startuur en locatie invullen. De website-status wordt bewust ingesteld: `scheduled`, `live` of `ended`. Een ingestelde tijd bewijst immers niet dat een stream werkelijk live is. Na de uitzending kan dezelfde link de opname tonen.

### Mux voor on-demand video

De Mux React-speler is aanwezig en wordt pas geïmporteerd wanneer een Mux-video wordt geopend. Publieke playback-ID’s mogen in de contentconfiguratie staan; Mux API-tokens horen op een server. Zie [Mux Player](https://www.mux.com/docs/guides/mux-player-web) en [lazy loading](https://www.mux.com/docs/guides/player-lazy-loading).

Eerste werkwijze: upload in het Mux-dashboard, kopieer de playback-ID en voeg een video-item toe. Dit geeft een echte publicatieroute zonder nu een onbeveiligd uploadscherm te bouwen. Voor een later beheersysteem: ingelogde editor → server vraagt een Mux Direct Upload-URL → browser uploadt rechtstreeks → server verwerkt een gereed-webhook → editor publiceert titel, poster en playback-ID. [Mux Direct Uploads](https://www.mux.com/docs/guides/upload-files-directly) documenteert dit patroon. Een playback-ID is niet de asset-ID.

### Foto’s en beheer

Vandaag: bestanden in `public/media/`, titel/alt-tekst en verwijzing in `public/content.json`, dan herladen of publiceren. Dit bestand is centraal aanpasbaar zonder componentcode te wijzigen. Het is nog geen CMS.

Volgende fase: een eenvoudig beheersysteem voor events, albums, foto’s en video’s. Velden: titel, publicatiedatum, editie, venue, cover, alt-tekst, mediabestand/playback-ID, publicatiestatus. Maak echte editiepagina’s zodra er meerdere gepubliceerde albums zijn; houd de homepage een selectie.

### Tickets en hosting

Begin tickets met een externe checkout: een echte `ticketUrl` activeert de headeractie. Kies de leverancier op betaalmethoden, mobiele checkout, servicekosten, refunds en export van bezoekersgegevens. Bouw een eigen checkout alleen wanneer er een concrete nood is.

De productie-build staat in `dist/` en kan op een statische host. Na de hostingkeuze koppelen we `clubglemm.com`, HTTPS en een redirect tussen `www` en het hoofddomein. Voeg daarna absolute Open Graph-URL’s en een eigen deelafbeelding toe; test de daadwerkelijke domeinlink vanuit Instagram op een iPhone en Android. Een CMS/uploadserver kan later apart worden toegevoegd.

## Uitvoering in fases

**Nu, lokaal — gerealiseerd:** vormgeving, responsive layout, logo-optimalisatie, contentconfiguratie, streamtoestanden, galerij, Mux-speler, agenda en deelactie.

**Voor de uitzending van 7 oktober:** echte streamlink, startuur, locatie en Instagram-account invullen; eigen hero-foto toevoegen; hosting kiezen, domein koppelen en embed op het publieke domein testen.

**Na de eerste editie:** Mux-replays en albums publiceren, CMS kiezen voor zelfstandig beheer, aankondigingen/edities uitbreiden en ticketprovider koppelen.

## Nog ontbrekende gegevens

- Locatie en startuur van 7 oktober.
- YouTube-livestreamlink en Instagram-account.
- De bestaande eventfoto’s en gewenste hero-selectie.
- Mux-account/playback-ID’s wanneer de eerste terugkijkvideo klaar is.
- Hosting/DNS-provider; later ticketprovider en contactadres.

Deze ontbreken bewust in de website; geen artiesten, locaties, prijzen of vorige edities zijn verzonnen.

### Bijgestelde ontwerpkeuze, 6 oktober 2026

De nieuwste gebruikerskeuze vervangt de eerdere donkere rode stijl: vrouwen zijn de primaire doelgroep, de layout blijft behouden en het palet wordt crème, oudroze, salie en warme zandtinten met cacaokleurige tekst. Urbanist/Open Sans en de originele Glemm-identiteit blijven. De copy richt zich op een avond met vriendinnen, jezelf mooi voelen en samen herinneringen maken. De referenties blijven bruikbaar voor event-/videostructuur; hun nachtelijke kleurwereld is geen actuele ontwerpautoriteit. Het geldende contract staat in docs/homepage-direction.md en de gerealiseerde tokens in DESIGN.md.
