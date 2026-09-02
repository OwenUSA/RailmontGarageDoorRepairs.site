// Per-site harness config -- Railmont Garage Door Repairs.
// The shared harness at ../_shared/harness carries no site data by design.
// See _shared/harness/src/config.mjs for the full field list and defaults.

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
  masterSeed: 3108,
  gradientSamples: 5,
};
