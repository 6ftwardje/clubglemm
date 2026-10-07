---
name: "Club Glemm"
description: "Een eenvoudige eventsite in beige met subtiel Glemm-rood."
colors:
  accent: "#e21b1c"
  accent-hover: "#c91617"
  on-accent: "#fffaf5"
  accent-ink: "#bd181b"
  focus: "#bd181b"
  ink: "#25221f"
  ink-hover: "#3b352f"
  paper: "#f0ebe2"
  muted: "#625a51"
  line: "#cfc5b6"
  control-line: "#9d9284"
  sand: "#e1d8cb"
  surface: "#e9e1d5"
  player: "#f5f1e9"
  scrollbar: "#958775"
typography:
  display:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "clamp(48px, 5.7vw, 82px)"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "clamp(36px, 4.3vw, 64px)"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "23px"
    fontWeight: 500
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  action:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 600
rounded:
  control: "6px"
  circle: "50%"
spacing:
  gutter: "clamp(22px, 5.5vw, 88px)"
  compact: "20px"
  standard: "24px"
  wide: "28px"
  section-gap: "40px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    padding: "15px 24px"
    rounded: "{rounded.control}"
  button-dark-hover:
    backgroundColor: "{colors.ink-hover}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    padding: "15px 24px"
    rounded: "{rounded.control}"
  menu-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "12px 18px"
    rounded: "{rounded.control}"
  text-action:
    backgroundColor: "transparent"
    typography: "{typography.label}"
    padding: "4px 0"
  text-action-hover:
    textColor: "{colors.ink}"
  navigation:
    textColor: "{colors.ink}"
  media-filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    padding: "12px 2px"
  media-filter-active:
    textColor: "{colors.accent-ink}"
  media-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0"
  media-open:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    height: "54px"
    width: "54px"
  media-open-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  archive-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    padding: "15px 24px"
    rounded: "{rounded.control}"
  archive-toggle-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  icon-button:
    backgroundColor: "transparent"
    padding: "0"
    height: "44px"
    width: "44px"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.action}"
    padding: "15px 24px"
    rounded: "{rounded.control}"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
---

# Design System: Club Glemm

## Overview

**Creative North Star: "Beige event poster"**

De poster voor de derde editie is de kleurreferentie: een warme beige ondergrond, donkere tekst en herkenbaar Glemm-rood. Grote vlakken blijven beige; rood verschijnt in kleine acties, de datum, actieve filters en hover-/focusdetails. De bestaande eenvoudige compositie, Urbanist/Open Sans en eigen eventfotografie blijven behouden.

De pagina bevat hero → livestream → foto’s → footer. De hero toont alleen het beeldmerk, de livestreamactie en datum. Het jurkverhaal, de tekstband en de afsluitende uitnodiging blijven verwijderd. De navbar bevat alleen een zichtbare menuknop; de hero gebruikt het geanimeerde beeldmerk als overlay en de footer het statische beeldmerk.

## Colors

- **Beige** (`paper`, #f0ebe2): pagina, archief, footer en mobiele actiebalk.
- **Warm beige** (`surface`, #e9e1d5): de livestreamsectie.
- **Zand** (`sand`, #e1d8cb): mediavlakken en rustige navigatie-hover.
- **Licht papier** (`player`, #f5f1e9): livestream-cover.
- **Donkere inkt** (`ink`, #25221f): tekst en het aangeleverde beeldmerk.
- **Warme secundaire inkt** (`muted`, #625a51): ondersteunende labels.
- **Glemm-rood** (`accent`, #e21b1c): primaire actie, afspelen, kleine iconen en lijnen.
- **Dieper rood** (`accent-hover`, #c91617): hover van de primaire actie.
- **Leesbaar rood** (`accent-ink` / `focus`, #bd181b): datum, actieve filtertekst, hoveraccenten en focuscontouren.
- **Warm wit op rood** (`on-accent`, #fffaf5): tekst en iconen op een rode control.
- **Lijn** (`line`, #cfc5b6), **controlrand** (`control-line`, #9d9284) en **scrollbar** (#958775): rustige functionele details.

**The Contrast Rule.** Gebruik donkere inkt op beige en warm wit op rode knoppen. Kleine rode tekst gebruikt accent-ink. Grote rode achtergronden worden vermeden: de poster levert de kleurrelatie, terwijl de website rustig blijft.

## Typography

Urbanist voor titels; Open Sans voor tekst, data en controls. Beide fonts zijn lokaal gehost (400–700). Sectietitels blijven kort: Livestream/Replay en Foto’s. Media-namen en beschrijvingen zijn beschikbaar in de toegankelijke knopnaam en de viewer, zonder captions onder alle galerijbeelden.

**The Identity Rule.** Behoud de originele logo- en animatiebronnen. Het witte PNG-logo krijgt donkere inkt via CSS. De animatie wordt uitsluitend als hero-overlay gebruikt, met een statische fallback bij reduced-motion, databesparing of afspeelfouten; er staat geen logo in de navbar.

## Layout

Behoud de huidige hero-posities, eigen fotografie en gedeelde zijmarge `gutter`. De hero-overlays gebruiken beige en zand. Geen nieuwe secties of decoratieve elementen toevoegen. Op desktop gebruikt de galerij twee kolommen; onder 700px één kolom. De header toont alleen Menu met een rood plusicoon, op een donkere knop met beige tekst. Op alle schermgroottes opent dezelfde kinetische navigatie met Home, Livestream/Replay en Foto’s. Instagram en Contact verschijnen alleen met ingevulde gegevens.

De navbar heeft een volledig transparante achtergrond zonder onderrand en blijft bovenaan in beeld bij scrollen. De pagina behoudt haar oorspronkelijke positie onder de navbar. Ankerbestemmingen houden rekening met de hoogte van de navbar op desktop en mobiel.

Het aangeleverde Sterling Gate-menu is aangepast in src/components/ui/sterling-gate-kinetic-navigation.tsx met gewone project-CSS en GSAP/CustomEase. Op desktop schuift een breed paneel vanaf rechts binnen; op mobiel vult het de breedte. Drie beige panelen en gemaskeerde tekstregels openen met een korte stagger. Sluiten keert de animatie sneller om. De plus draait naar een kruis en Menu wisselt naar Sluiten.

De menuknop is minimaal 48px hoog, met 14px tekst en een subtiele schaduw; lege headeroppervlakken blokkeren geen paginainteracties. De vaste mobiele livestreambalk houdt rekening met de veilige onderrand; de pagina reserveert hiervoor ruimte. Onder 360px blijven datum en actie bruikbaar. Boven 1700px wordt sectie-inhoud gecentreerd op 1540px.

## Components and states

De rode hoofdactie gebruikt warm witte tekst en een donkerder rode hover. De menuknop gebruikt donkere inkt met beige tekst, een rode plus en een warm donkere hover. Gekozen mediafilters krijgen rode tekst plus een onderstreping. Media-opencontrols worden rood op hover; foto’s behouden hun eigen kleuren.

Het archief toont eerst vier items, met Bekijk alles / Toon minder. Filters herstellen de compacte toestand. Foto’s en video’s openen in de native dialoog met focusbescherming, Escape en focusherstel. De enige schaduw is de warme donkere dialoogschaduw; secties en kaarten blijven vlak.

**The Flat Section Rule.** Gebruik kleurvlakken, fotografie en ruimte voor hiërarchie. De dialoog mag boven de pagina liggen omdat hij een eigen kijkmodus opent.

Live vereist een bruikbare YouTube-link; zonder link blijft Livestream volgt zichtbaar. YouTube en Mux laden na een handeling. Kalender- en deelacties zijn verwijderd; de datum, uren en locatie blijven zichtbaar. Datum, uur en locatie komen uit content.json. Voor de komende derde editie bevestigt de poster 7 oktober 2026, 21:00–03:00, Bar Jan Cremer, Kramersplein 6 in Gent. Instagram, livestream en ticketlink blijven onbevestigd.

Het menu gebruikt zes bestaande WebP-thumbnails als volledige achtergrondbeelden op 13% opacity. De foto wisselt bij hover/focus per link en bij elke nieuwe opening; abstracte shapes zijn weggelaten. De thumbnails laden pas bij het openen. Het menu blokkeert achtergrondscroll en houdt focus binnen de navigatie. Escape, de sluitknop, klikken buiten het desktop-paneel en een link sluiten het. Een interne link herstelt scroll en verplaatst focus naar de bestemming; anders keert focus terug naar de menuknop. Reduced-motion toont de complete toestand direct. Snel omkeren onderbreekt de bestaande timeline vloeiend.

De navbar heeft geen logo of automatisch afspelende video. De logoanimatie staat alleen in de hero; de galerij bevat 43 foto’s en gebruikt thumbnails met lazy loading. De filters verschijnen alleen wanneer er ook echte video’s zijn. Subtiele bestaande binnenkomsten en hoverbeweging blijven behouden; de eerder verwijderde tekstband blijft weg.

## Do's and Don'ts

- **Do** behoud de eenvoudige opzet, originele merkassets, fonts en eigen fotografie.
- **Do** gebruik beige voor grote vlakken en rood voor een beperkt aantal acties en details.
- **Do** houd copy kort, focus zichtbaar en de mobiele livestream binnen één tik bereikbaar.
- **Don't** herstel roze of saliegroene UI-vlakken, brede rode secties, sterren of glitterdecoratie.
- **Don't** verzin ticketprijzen, een women-only toelatingsregel of ontbrekende providerlinks.
