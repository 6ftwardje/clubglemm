# Club Glemm

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Delegated by the user: React + TypeScript with Vite. Hosting is undecided. The user chose building directly in code, without a preliminary mockup.

## Users
Women are the primary audience, arriving on mobile from Instagram to plan an evening with friends, discover the next event and its livestream, then revisit photos and videos. The user requested a clearly women-focused voice; no exclusive admission rule has been supplied.

## Product Purpose
An owned home for a recurring event brand, with livestreams, photo and video content, announcements, and eventually ticket sales.

## Positioning
Club Glemm began at Bar Jan Cremer in Gent and travels between venues. The name comes from glamorous: an occasion to wear the special outfit in your wardrobe. Past editions included limousines, champagne and oysters.

## Operating Context
The next event is 7 October 2026. The supplied YouTube livestream is https://www.youtube.com/live/VFnzuxdkMow and loads in the existing embedded player after a click. Its website status remains scheduled until the broadcast is confirmed live. Instagram drives visits to the website. The supplied October poster confirms the third edition at Bar Jan Cremer, Kramersplein 6, Gent, from 21:00 to 03:00 the following day. The Instagram handle is still unconfirmed.

## Capabilities and Constraints
Dutch copy. Livestream is the primary homepage action. Mux for hosted on-demand video. Provide a photo publishing structure for existing event photos. Later add announcements and a ticket provider. Do not invent event times, locations, artist lineups, prices or archival editions.

## Brand Commitments
Preserve the supplied white logo and logo animation. Use the supplied poster as the colour reference: beige and sand on large surfaces, dark ink, and subtle Glemm-red accents. This supersedes the blush/sage palette. Preserve Urbanist headings, Open Sans body copy, original brand assets, no star icons, and mobile-first livestream access. The 7 October request reduces website text, removes the dress/story feature and repeated invitation sections, and loops the supplied logo animation in the top-left navbar. The hero and footer use the static logo. Keep copy minimal and do not invent a women-only policy. The latest request replaces the navigation with the supplied kinetic React/GSAP component; use low-opacity real Glemm photos instead of abstract shapes, changing photos by link and on each opening.

## Evidence on Hand
- `Assets/glèmm_logo_white.png`: supplied white logo.
- `Assets/glemm logo.mov`: supplied 5-second animation, 2880×2160, approximately 439 MB; derive a compressed browser version.
- 21 user-supplied photographs in `Assets/Fotos`, including duplicate views. Eight selected event photos, an original hero photo and a Bar Jan Cremer story photo are published as optimized WebP derivatives.
- The supplied October poster confirms 7 October 2026, the third edition, venue/address and 21:00–03:00. Use it as a visual reference; its Instagram overlay is not website content.
- The YouTube livestream URL was supplied on 7 October 2026: https://www.youtube.com/live/VFnzuxdkMow. No Mux playback IDs or ticket link supplied yet.

## Product Principles
- Put the next broadcast within one tap from Instagram.
- Keep event information and provider links centrally editable.
- Distinguish announced, live and replay states honestly.
- Prioritise fast media and accessible controls on mobile.
- Use real Glemm assets; clearly distinguish illustrative imagery from event documentation.

The latest 7 October request removes the navbar logo and date action. Keep one clearly visible sticky Menu button. Publish the website to 6ftwardje/clubglemm on GitHub, deploy through Netlify and connect clubglemm.com using its existing Combell DNS.

De nieuwste contentaanpassing van 7 oktober gebruikt de logoanimatie uitsluitend als overlay in de hero, met een statische fallback. De animatie is verwijderd uit de galerij. De hero-uitnodiging en kalender-/deelacties zijn verwijderd; de eventdatum blijft zichtbaar. Momenten heet nu Foto’s in de sectie en navigatie. Alle 35 recent toegevoegde WhatsApp-foto’s van 7 oktober uit Downloads zijn toegevoegd naast de acht bestaande foto’s, met WebP-bestanden en thumbnails.
