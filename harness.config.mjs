// Per-site harness config -- Railmont Garage Door Repairs.
// The shared harness at ../_shared/harness carries no site data by design.
// See _shared/harness/src/config.mjs for the full field list and defaults.

// The /services commercial gallery, DELETED wholesale with its band (D-01). Listed by
// basename so each tile still gets its own inventory row and nothing is silently dropped.
const GALLERY = [
  'Chestnut-Square-Commercial', 'Commercial-Chapin-Furniture', 'Commercial-Chapin-Furniture-2',
  'Cregger-Company-Commercial', 'Deisel-Laptops-Commercial-', 'Gateway-Baptist', 'Grille-on-Main',
  'Missionary-Memorial', 'Tarrant-Properties', 'Whataburger-Commercial',
];

export default {
  // Points at the LOCAL reference server. Start it from this site root:
  //   node ../_shared/harness/src/serve-reference.mjs
  // It resolves the port from this value, hard-fails on a collision, and prints the served
  // <title> at startup. Verify that title before trusting any capture -- a sibling's server
  // on a shared port answered 200 with the WRONG site and the numbers looked entirely normal.
  referenceOrigin: process.env.REF_ORIGIN || 'http://127.0.0.1:3208',
  devPort: 3108,

  // ref path -> our route. The package keys on the REFERENCE path.
  // Live reference: https://roofteam.com/
  routeMap: {
    '/': '/',
    '/about-us': '/about',
    '/commercial-roofing': '/services',
    '/get-an-estimate': '/contact',
    '/privacy-policy': '/privacy',
  },

  breakpoints: { diff: [390, 768, 1440], extra: [430], canonical: 1440 },

  // ---- segmentation, FILLED BY PROMPT 1 from the SAVED copy in reference/raw/ -------
  // Reference framework: WordPress 7.0.2 + bespoke theme `splashomnimediatheme`
  // (Bootstrap-grid markup, jQuery, jQuery.mmenu drawer). NOT Divi/Elementor/Avada/Fusion.
  // There is not a single <section>, <header>, <footer>, <main> or <nav> tag on any of the
  // five pages -- the whole document is divs -- so every tag-shaped candidate scores 0 and
  // the generic default list would have fallen through to the body-children fallback.
  //
  // `#page > div` is the band container and yields 16/13/14/6/6 outer bands on
  // home/about/services/contact/privacy, IDENTICALLY at 390, 768 and 1440. No band splits
  // at any width, so the probe's ordinal ids are stable across the whole BP_SET.
  //
  // `:not(.instant-quote-new)` is load-bearing, not tidying. The Roofle instant-quote
  // widget is an absolutely-positioned overlay inside #page, so it sorts by docTop into a
  // DIFFERENT ordinal slot at 390 than at 768/1440 (on /about-us it lands at index 2 at the
  // two wider widths and index 3 at 390), which shifts every id after it and unpairs the
  // page. It is also DELETED by contract (no quote tool among our five routes), so nothing
  // is lost by excluding it from segmentation.
  //
  // The last two entries are OUR side: the Next tree has no #page, so it falls through to
  // `main > section`.
  sectionCandidates: ['#page > div:not(.instant-quote-new)', '#page > div', 'main > section', 'section'],
  // EXACT selectors only -- config.mjs REFUSES a [class*=] matcher at startup, because one
  // matched <body class="pb-callbar"> on a sibling and containment-dedup then deleted
  // HEADER and FOOTER from every capture.
  // The reference's chrome is DIV#header / DIV#footer (id, not tag). Those are already
  // #page children, so on the reference side these entries are a no-op that the containment
  // check absorbs; they exist for OUR side, where the shell is a real <header>/<footer>.
  // `.bottom-area` (the fat NAP/locations footer block) is deliberately NOT listed: it is
  // already a #page band and listing it would only risk swallowing a sibling band.
  chromeSelectors: ['#header', '#footer', 'header', 'footer'],
  headerSelector: '#header, header',
  // Reference hamburger is `.nav-btn > a` (two span.mm-line rules); jQuery.mmenu drawer.
  navToggleSelector: '.nav-btn a, button[aria-controls], .menu-toggle, .hamburger',
  drawerSelector: '.mm-menu, .mm-panel, [data-drawer], .mobile-menu, .nav-drawer',
  ctaSelector: 'a[href^="tel:"], button, [class*=btn], [class*=button]',
  logoSelector: '.custom-logo, #header img, header img, .logo img, #logo',
  // No icon font on the reference: every glyph is an inline SVG (.svg-icon/.svg-omnimedia).
  // Text renders in Teko (display) and Hind (body), both Google/OFL -- see docs/profile.md.
  iconFontFamilies: /fontawesome|icomoon|material|elementskit|awb-icons|eicons/i,

  thresholds: { fidelity: 2, struct: 5, token: 0 },
  fidelityMode: 'auto',

  tokenSources: ['app/globals.css', 'app/tokens.css', 'styles/tokens.css'],
  contractPath: 'docs/sections.md',
  reportPath: 'docs/divergence.md',
  copyModulePath: 'content/copy.ts',

  industryAllowlist: [
    'garage door', 'torsion spring', 'extension spring', 'opener', 'cable', 'roller',
    'track', 'panel', 'off-track', 'remote', 'keypad', 'sensor', 'weather seal',
    'residential', 'commercial', 'same-day', 'free estimate', 'repair', 'installation',
    'replacement',
  ],
  gramN: 5,
  trigramMax: 0.15,
  lengthTolerance: 0.1,

  // ---- length exemptions (Prompt 3) --------------------------------------------------
  // TWO entries, both `*::` so they cover all five routes, and both forced by the decision
  // register rather than chosen for convenience. Every other block on this site is held to
  // +/-10%, including the 23-character `credentials` band and the 86-character legal strip.
  //
  // An exemption is only legitimate where the rule CANNOT apply. "Hard to hit" is not that.
  lengthExempt: {
    '*::header': 'The reference header is a nine-item mega-menu whose textContent is a full ' +
      'site map: 44 navigation labels across residential, commercial, resources, locations ' +
      'and careers, plus four CallRail phone CTAs, totalling 2159-2622 characters depending ' +
      'on the page. D-01 fixes this site at FIVE routes and forbids adding blog, gallery, ' +
      'FAQ, careers, booking or per-service routes; D-02 scrubs the locations tree. Matching ' +
      'the character count would require inventing roughly forty destinations that the ' +
      'decision register has already refused. The rule cannot apply — the block length is a ' +
      'function of site size, and site size is fixed elsewhere in the contract.',
    '*::footer-nap': 'Same cause, same block. The reference fat footer repeats that site map ' +
      '(2013 characters on all five pages) as four link columns plus a locations column. Our ' +
      'footer carries the NAP, the hours, the single D-02 SERVICE_AREA sentence, five route ' +
      'links and the eight symptom headings — every piece of navigable content this site ' +
      'has. Reaching 2013 characters means padding with invented pages or invented prose, ' +
      'which is a worse failure than a declared exemption.',
  },

  // ---- palette (merged Prompt 5+9) ---------------------------------------------------
  // TARGET PRIMARY HUE WINDOW FOR THIS SITE: 105-130 (green)
  //
  // The fleet's hue space is nearly full. Seven sites already hold 46, 150, 184, 217, 252,
  // 270 and 332, which at ~30 degrees of separation leaves roughly four usable windows for
  // the four sites being added. Each new site is therefore assigned one, rather than told
  // to avoid a list -- "avoid these seven" is unsatisfiable guidance at this density.
  //
  // Land the winning primary inside the window above. Steer the masterSeed to get there;
  // never touch the selection rule, which is what keeps the CTA the highest-contrast
  // element. Report how many seeds you tried. Note the auto-selector is structurally biased
  // toward magenta accents -- at fixed OKLCH L/C the lowest luminance sits near hue 300-360
  // -- so seeds landing there are common and must be re-rolled unless that IS your window.
  // ---- asset slot rules (Prompt 2) ---------------------------------------------------
  // Checked IN ORDER by inventory.mjs classify(); first match wins. Basenames are the
  // WordPress srcset base (foo-480x281.png -> foo), so one rule covers every variant.
  // Provenance follows D-09: every photograph, logo, wordmark, staff shot, badge and
  // review graphic belonging to Premiere Roofing is REPLACE and is NEVER downloaded into
  // this repo. DELETED marks a slot inventoried on purpose and then not built, either
  // because its band is DELETED in docs/sections.md or because a lucide-react glyph
  // satisfies it with no file at all.
  slotRules: [
    // --- shell -------------------------------------------------------------------
    { match: /^logo$/, id: 'logo-header', sec: 'header', prov: 'REPLACE',
      note: 'Reference wordmark. Ours is a Teko wordmark + icon lockup, TODO(fact): logo asset.' },
    { match: /^img-bottom-logo$/, id: 'logo-footer', sec: 'footer-nap', prov: 'REPLACE',
      note: 'Footer lockup: the same brand asset at a wider aspect.' },
    { match: /^img-menu-testi$/, id: 'deleted-megamenu-thumb', sec: 'header', prov: 'DELETED',
      note: 'Hidden mega-menu testimonial thumbnails. 0x0 at every breakpoint (they never enter the viewport) and our nav has no mega-menu.' },
    { match: /^select-arrow$/, id: 'form-select-chevron', sec: 'callback-form', prov: 'DELETED',
      note: 'Generic UI chevron, not a brand asset. Satisfied by lucide-react ChevronDown (TAKE) — no image file ships.' },

    // --- home / hero -------------------------------------------------------------
    { match: /^img-sv1$/, id: 'hero-pillar-1', sec: 'hero', prov: 'REPLACE', note: 'Hero pillar thumbnail 1 of 3.' },
    { match: /^img-sv2$/, id: 'hero-pillar-2', sec: 'hero', prov: 'REPLACE', note: 'Hero pillar thumbnail 2 of 3.' },
    { match: /^img-sv3$/, id: 'hero-pillar-3', sec: 'hero', prov: 'REPLACE', note: 'Hero pillar thumbnail 3 of 3.' },
    { match: /^img-form-head$/, id: 'form-head-graphic', sec: 'hero', prov: 'REPLACE',
      note: 'Rasterised heading strip above the form. Ours is live Teko text, so no file is generated — the row stays because the slot occupies real height in the band.' },

    { match: /^bg-main$/, id: 'intro-bg', sec: 'intro', prov: 'REPLACE', note: 'Full-bleed band background behind the intro prose.' },

    { match: /^Architectural-Shingles$/, id: 'door-style-1', sec: 'door-styles', prov: 'REPLACE', note: 'Style-slider frame 1.' },
    { match: /^GrandManor-Designer$/, id: 'door-style-2', sec: 'door-styles', prov: 'REPLACE', note: 'Style-slider frame 2.' },
    { match: /^pr-img03$/, id: 'door-style-3', sec: 'door-styles', prov: 'REPLACE', note: 'Style-slider frame 3.' },

    { match: /^img-roofing1$/, id: 'why-us-1', sec: 'why-us', prov: 'REPLACE', note: 'Why-us carousel frame 1.' },
    { match: /^fast-friendly-detailed-estimate$/, id: 'why-us-2', sec: 'why-us', prov: 'REPLACE', note: 'Why-us carousel frame 2.' },
    { match: /^financing-available$/, id: 'why-us-3', sec: 'why-us', prov: 'REPLACE', note: 'Why-us carousel frame 3. Their financing claim is scrubbed (D-12); only the slot geometry survives.' },
    { match: /^insurance-claims-assistance-1$/, id: 'why-us-4', sec: 'why-us', prov: 'REPLACE', note: 'Why-us carousel frame 4.' },
    { match: /^maintenance-agreements$/, id: 'why-us-5', sec: 'why-us', prov: 'REPLACE', note: 'Why-us carousel frame 5.' },

    { match: /^bg-plan$/, id: 'process-bg', sec: 'process', prov: 'REPLACE', note: 'Full-bleed background behind the three-step process band; the same slot on / and /services.' },
    { match: /^img-cust-rev-quote$/, id: 'testimonial-quote-mark', sec: 'testimonials', prov: 'REPLACE',
      note: 'Decorative quote glyph. Satisfied by lucide-react Quote at the same box; a file is generated only if the glyph reads wrong at 82x63.' },

    { match: /^bg1$/, id: 'promise-bg', sec: 'promise', prov: 'REPLACE', note: 'Promise band background, >=768 only.' },
    { match: /^bg-imvd-mobile$/, id: 'promise-bg-mobile', sec: 'promise', prov: 'REPLACE', note: 'Promise band background, 390 only. A separate file on the reference, so a separate crop for us.' },
    { match: /^Premiere-Hype-Video$/, id: 'promise-media', sec: 'promise', prov: 'REPLACE',
      note: 'Vimeo poster frame. We ship no video and no third-party embed (D-15); the slot becomes a still image at the same box.' },

    // --- home / lower bands ------------------------------------------------------
    { match: /^img-com-icon$/, id: 'icon-commercial', sec: 'quality-band', prov: 'REPLACE',
      note: 'Commercial-door icon. Appears in the DELETED locations band on home and again in the /services quality band, where it survives.' },
    { match: /^img-res-icon$/, id: 'deleted-locations-icon-residential', sec: 'deleted-locations', prov: 'DELETED', note: 'Locations-grid residential icon; the band is deleted by D-02.' },
    { match: /^Service-Locations-Map_Premiere$/, id: 'deleted-locations-map', sec: 'deleted-locations', prov: 'DELETED', note: 'Service-area map graphic; D-02 scrubs the locations grid entirely. Our D-08 map is a live keyless iframe, not an image.' },

    { match: /^Homepage-Content-Background-1$/, id: 'new-door-cta-bg', sec: 'new-door-cta', prov: 'REPLACE', note: 'Full-bleed background behind the new-construction CTA band.' },
    { match: /^img-tob$/, id: 'cta-lockup', sec: 'new-door-cta', prov: 'REPLACE', note: 'Small brand lockup inside the CTA band; reused in the /services experience band.' },

    { match: /^bg-meet-the-team$/, id: 'deleted-team-bg', sec: 'deleted-team', prov: 'DELETED', note: 'Staff band background; the band is deleted (D-09 photos, D-17 names).' },
    { match: /^Darrel-Greene$/, id: 'deleted-team-headshot-1', sec: 'deleted-team', prov: 'DELETED', note: 'Named staff headshot; we may not reuse it and may not invent a replacement person.' },
    { match: /^Jeremy-Gazella$/, id: 'deleted-team-headshot-2', sec: 'deleted-team', prov: 'DELETED', note: 'Named staff headshot; see above.' },
    { match: /^Lance-Fauerbach$/, id: 'deleted-team-headshot-3', sec: 'deleted-team', prov: 'DELETED', note: 'Named staff headshot; see above.' },

    // --- /services ---------------------------------------------------------------
    { match: /^Commercial-Roofing$/, id: 'services-banner-image', sec: 'services-banner', prov: 'REPLACE', note: 'Banner hero image on /services.' },
    { match: /^Commercial-Roof-Repair-Icon$/, id: 'services-pillar-1', sec: 'services-banner', prov: 'REPLACE', note: 'Services banner pillar 1 of 3.' },
    { match: /^Commercial-Roof-Replacement-Icon$/, id: 'services-pillar-2', sec: 'services-banner', prov: 'REPLACE', note: 'Services banner pillar 2 of 3.' },
    { match: /^Commercial-New-Construction-Icon$/, id: 'services-pillar-3', sec: 'services-banner', prov: 'REPLACE', note: 'Services banner pillar 3 of 3.' },
    { match: /^Increased-Efficiency-1$/, id: 'quality-icon-1', sec: 'quality-band', prov: 'REPLACE', note: 'Quality band icon 1 of 3.' },
    { match: /^Long-Term-Saving$/, id: 'quality-icon-2', sec: 'quality-band', prov: 'REPLACE', note: 'Quality band icon 2 of 3.' },
    { match: /^Full-Team-Photo$/, id: 'services-detail-image', sec: 'services-detail', prov: 'REPLACE',
      note: 'Reference uses a full staff photo. Ours is a generic workshop / door image at the same box — no invented people (D-17).' },
    { match: /^commcercial-banner$/, id: 'experience-bg', sec: 'experience-band', prov: 'REPLACE', note: 'Full-bleed background behind the experience band. (Reference filename misspelling preserved so the rule matches.)' },

    ...GALLERY.map((n, i) => ({
      match: new RegExp('^' + n + '$'),
      id: `deleted-gallery-${String(i + 1).padStart(2, '0')}`,
      sec: 'deleted-gallery', prov: 'DELETED',
      note: 'Commercial gallery tile; the band exists only to link to a gallery route that is out of scope (D-01).',
    })),
  ],

  // Certification / award badges. These fall through slotRules and are matched here so a
  // badge grid never has to be enumerated by hand. Every one is REPLACE, and every one is
  // an uninvented business fact — the built chips are TODO(fact) placeholders (D-14).
  badgePatterns: [
    { match: /^(Best-of-Irmo|EOS$|Everest-Systems|GAF-|img-cert\d|Irmo-Chapin|Mule-Hide|roofing_contractors|Select-Shingle|The-States-Best|Verico-|Duro-Last)/,
      idPrefix: 'credential-badge', sec: 'credentials',
      note: 'Third-party certification / award badge. We hold none of these credentials and may not invent equivalents (D-14); the slot ships as a TODO(fact) chip at these dimensions.' },
  ],

  // Slots that are genuinely ONE asset repeated on every route, not one per route.
  sharedSlots: {
    'logo-header': true,
    'logo-footer': true,
    'form-select-chevron': true,
    'deleted-megamenu-thumb': true,
  },

  masterSeed: 3108,
  gradientSamples: 5,
};
