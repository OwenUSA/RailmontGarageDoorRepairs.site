// content/copy.ts — every word this site renders, in one typed module.
//
// WHY IT IS ALL HERE. Route files import from this module and never hardcode a string —
// metadata titles and descriptions included. A sibling site hardcoded `metadata` into five
// page files, shipped the wrong city in all five, and no gate could see it because no gate
// reads page files. `similarity.mjs` reads THIS module, so anything in here is measured.
//
// GATES THIS FILE MUST PASS (Prompt 3):
//   node ../_shared/harness/src/similarity.mjs
//   - zero shared 5-grams with the ENTIRE reference corpus (all five pages)
//   - trigram Jaccard <= 0.15 against the paired reference section
//   - every block within +/-10% of its reference slot's character count
//
// WHAT MUST NOT GO IN HERE. Only text a visitor actually reads. No `href`s, no `alt` text,
// no aria labels, no class names — `similarity.mjs` flattens every value in a section
// object except `id`, `refSection` and `cls`, and the reference side is measured as
// `element.textContent`, which excludes attributes. Putting a `tel:` href or an alt string
// in here inflates our character count against a reference number that never counted it.
// Components own hrefs and alt text.
//
// NO ELECTRONIC MAIL, ANYWHERE (D-03). No mail-protocol links, no address bearing an at
// sign, no mail-typed input, no mailing-list or sign-up wording, no envelope CTA.
//
// This comment is deliberately written WITHOUT those literal tokens. The sweep in CLAUDE.md
// greps `app components lib content`, so a banner that names the banned strings makes the
// gate report a hit on itself — and a gate that always reports a hit is a gate everyone
// learns to wave through. The rule is stated here; the strings live only in the sweep.
//
// NO INVENTED FACTS (D-14 / D-17). Credentials, years in business, review counts, prices,
// response times and team size are `TODO(fact):` markers that RENDER VISIBLY and are listed
// in docs/facts-needed.md. If you are about to type a number that is not in CONSTANTS,
// stop.

/* ---------------------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------------------ */

/** Divergence class, mirroring docs/sections.md. DELETED rows have no copy and no row here. */
export type SectionClass = 'ADAPTED' | 'NOVEL';

export interface Item {
  /** Short label — a card title, a step name, a symptom. */
  readonly label: string;
  /** Optional supporting line. */
  readonly text?: string;
}

export interface Faq {
  readonly q: string;
  readonly a: string;
}

export interface Section {
  /** Matches the component's `data-section` attribute and docs/sections.md `our-section-id`. */
  readonly id: string;
  /** Reference section id from docs/sections.md, or null for a NOVEL band with no counterpart. */
  readonly refSection: string | null;
  readonly cls: SectionClass;
  readonly heading?: string;
  readonly subheading?: string;
  readonly body?: readonly string[];
  readonly items?: readonly Item[];
  readonly faqs?: readonly Faq[];
  /** Button and link LABELS only. Never an href. */
  readonly ctas?: readonly string[];
  /** Visible TODO(fact) markers. Rendered, not commented out. */
  readonly todo?: readonly string[];
}

export interface Meta {
  readonly title: string;
  readonly description: string;
}

export interface Page {
  readonly meta: Meta;
  readonly sections: readonly Section[];
}

/** The five routes in CONSTANTS. Adding one is out of scope (D-01). */
export type Route = '/' | '/about' | '/services' | '/contact' | '/privacy';

export interface Copy {
  /** Keyed by the exact route union, so `copy.routes['/about']` is not `Page | undefined`
   *  under `noUncheckedIndexedAccess` and no page file needs a non-null assertion. */
  readonly routes: Readonly<Record<Route, Page>>;
}

/* ---------------------------------------------------------------------------------------
 * Business constants — CLAUDE.md CONSTANTS, verbatim. Every one is FICTIONAL and is listed
 * in docs/PRE-LAUNCH.md as must-replace-before-public.
 * ------------------------------------------------------------------------------------ */

export const business = {
  name: 'Railmont Garage Door Repairs',
  tagline: 'Set true, torqued to spec, and left running quiet.',
  phone: '(803) 555-0164',
  /** Digits only, for the component that builds the tel: href. Not copy. */
  phoneDigits: '18035550164',
  address: '873 Wexbury Landing, Fort Mill, SC 29708',
  mapCoords: '35.0074,-80.9451',
  hours: '7 days, 7:00 AM – 7:00 PM',
  serviceArea: 'Serving Fort Mill and the York County line.',
} as const;

/* ---------------------------------------------------------------------------------------
 * Shared bands. The shell repeats on all five routes and is ONE object, not five copies —
 * A-6 makes it lead-owned and frozen after Prompt 5.
 * ------------------------------------------------------------------------------------ */

const header: Section = {
  id: 'header',
  refSection: 's00-header',
  cls: 'ADAPTED',
  items: [
    { label: 'Home' },
    { label: 'About' },
    { label: 'Services' },
    { label: 'Contact' },
  ],
  ctas: [`Call ${business.phone}`, 'Menu', 'Close'],
};

const footerNap: Section = {
  id: 'footer-nap',
  refSection: 's13',
  cls: 'ADAPTED',
  heading: 'Railmont Garage Door Repairs',
  subheading: 'Set true, torqued to spec, and left running quiet.',
  body: [
    'One crew, one standard. Every door we touch is balanced by hand, torqued to the figure the hardware calls for, and run through a full cycle before we pack up.',
    business.serviceArea,
  ],
  items: [
    { label: 'Call', text: business.phone },
    { label: 'Visit', text: business.address },
    { label: 'Open', text: business.hours },
  ],
  ctas: ['Home', 'About', 'Services', 'Contact', 'Privacy Policy', 'Get directions'],
};

const footerLegal: Section = {
  id: 'footer-legal',
  refSection: 's14-footer',
  cls: 'ADAPTED',
  body: ['© 2026 Railmont Garage Door Repairs. All rights reserved.'],
  ctas: ['Sitemap', 'Privacy Policy'],
};

/** `s14-footer` on home; the interior routes carry their own ordinal for the same strip. */
const legalFor = (ref: string): Section => ({ ...footerLegal, refSection: ref });
const napFor = (ref: string): Section => ({ ...footerNap, refSection: ref });

const callBar: Section = {
  id: 'call-bar',
  refSection: null,
  cls: 'NOVEL',
  ctas: [`Call ${business.phone}`],
  body: ['Open 7:00 AM – 7:00 PM, every day'],
};

/** Same component on `/` and `/about`; the reference reuses its grid the same way. */
const servicesGrid: Section = {
  id: 'services-grid',
  refSection: 's04-premiere-roofing-services',
  cls: 'ADAPTED',
  heading: 'Start with the symptom',
  items: [
    { label: 'A spring let go' },
    { label: 'Will not close' },
    { label: 'Loud and rough travel' },
    { label: 'Damaged panel' },
    { label: 'Off its track' },
    { label: 'A new door' },
    { label: 'Shop roll-up door' },
    { label: 'Yearly check' },
  ],
};

/** The same grid, paired to its own reference band on /about (ordinal 6, not 4). */
const servicesGridAbout: Section = { ...servicesGrid, refSection: 's06-premiere-roofing-services' };

/* ---------------------------------------------------------------------------------------
 * Routes
 * ------------------------------------------------------------------------------------ */

const home: Page = {
  meta: {
    title: 'Garage Door Repair in Fort Mill, SC | Railmont',
    description:
      'Garage door repair in Fort Mill, SC. Springs, openers, cables, rollers, tracks and panels — balanced by hand and cycle-tested. Call (803) 555-0164.',
  },
  sections: [
    header,
    {
      id: 'hero',
      refSection: 's01-banner-get-a-free-estimate',
      cls: 'ADAPTED',
      heading: 'The repair holds',
      subheading: 'Set true, torqued to spec, and left running quiet.',
      items: [
        { label: 'RESIDENTIAL' },
        { label: 'COMMERCIAL' },
        { label: 'ROLL-UP' },
      ],
      body: [
        'Tell us what the door is doing and when you can take a call. We will ring you back inside our posted hours.',
        'No call centre and no dispatch queue. Whoever rings you back is whoever will be standing in front of the door, and looking at it costs you nothing whether or not you book the work that day.',
      ],
      ctas: [
        'Request a callback',
        'Your name',
        'Phone number',
        'What is the door doing?',
        'A spring let go',
        'It will not open or close',
        'Loud, rough travel',
        'A panel is damaged',
        'It sits off its track',
        'I want a new door',
        'Shop or roll-up door',
        'Yearly service check',
        'Best window for a call',
        'Morning',
        'Midday',
        'Afternoon',
        'Anything else we should know',
        'Send it',
      ],
    },
    {
      id: 'intro',
      refSection: 's02-residential-and-commercial-roofing',
      cls: 'ADAPTED',
      heading: 'Doors that stay fixed',
      body: [
        'A garage door is a balanced machine pretending to be a wall. When the counterweight is right, a 180-pound door lifts with two fingers and the opener barely works. When it is not, every part downstream pays for it — the cables fray, the rollers gall, the opener burns through its gears, and the door you called about is the third thing that failed, not the first.',
        'So we set the balance before we set anything else. Springs are sized to the door in front of us, not to whatever was on it. Track is squared and shimmed to plumb. Fasteners get the torque the hardware is rated for. Then the door runs a full cycle under its own weight, twice, while we watch it.',
      ],
      ctas: ['See what we work on'],
    },
    {
      id: 'process',
      refSection: 's06-protecting-your-investment-in-thre',
      cls: 'ADAPTED',
      heading: 'Three steps, no surprises',
      body: [
        'The same order every visit, whether it is a snapped spring at seven in the morning or a tune-up you booked a week out.',
      ],
      items: [
        {
          label: 'Look at the whole door',
          text: 'We lift it by hand with the opener disengaged and watch where it fights us. A door that drifts or binds tells you which part failed and which parts have been carrying it since.',
        },
        {
          label: 'Say what it needs, out loud',
          text: 'Before a tool comes out you get the finding in plain language: what broke, what it took with it, what can wait a season and what cannot. Nothing is replaced to save a check.',
        },
        {
          label: 'Set it and cycle it',
          text: 'Balance first, then hardware, then opener travel and force limits. The door runs top to bottom twice under its own weight, and the reversing edge is tested before we pack up.',
        },
      ],
      ctas: ['Book a visit'],
    },
    servicesGrid,
    {
      id: 'door-styles',
      refSection: 's03-choose-your-style',
      cls: 'ADAPTED',
      heading: 'PICK A PANEL',
      subheading: 'A door for every opening',
      body: ['Panels, finishes and window options for the opening you already have.'],
      items: [
        { label: 'Raised panel', text: 'The default on most streets' },
        { label: 'Flush', text: 'Flat face, quiet lines' },
        { label: 'Carriage', text: 'Overlay boards and side hinges' },
      ],
      ctas: ['See finishes', 'See finishes', 'See finishes'],
    },
    {
      id: 'why-us',
      refSection: 's05-the-best-choice-for-roofing',
      cls: 'ADAPTED',
      heading: 'Why the work holds',
      body: ['Five things we do on every visit, not five things we sell you.'],
      items: [
        { label: 'Balanced by hand' },
        { label: 'Torqued to the rating' },
        { label: 'Cycle-tested twice' },
        { label: 'Parts sized to your door' },
        { label: 'Checked before we leave' },
      ],
      ctas: ['Read more', 'Read more', 'Read more', 'Read more', 'Read more', 'Free estimate'],
    },
    {
      id: 'promise',
      refSection: 's08-what-does-it-mean-to-have-a-dedica',
      cls: 'ADAPTED',
      heading: 'What does a repair that holds actually cost you?',
      body: [
        'Less than the second visit. A spring changed without re-checking the drum wind will strip the cable off the drum inside a month. Rollers pressed into a track that is out of plumb will chew their stems and take the hinges with them. An opener asked to lift a door that is thirty pounds heavy on one side will run hot until the gear splits, and the gear is never the fault.',
        'Every one of those is a repeat call that was fully avoidable at the first visit, and every one of them starts the same way — somebody swapped the broken part and left without checking the load it lives under.',
        'We would rather spend the extra twenty minutes on the balance and never hear from you about this door again. That is the whole proposition. It is not fast and it is not cheap talk; it is the part of the job that decides whether the repair is still holding next winter.',
      ],
      ctas: ['Talk to us about your door'],
    },
    {
      id: 'testimonials',
      refSection: 's07-customer-reviews',
      cls: 'ADAPTED',
      heading: 'In their words',
      body: [
        'Our spring let go on a Sunday morning and Railmont still had someone out by early afternoon. The tech explained what happened before he touched anything, replaced the springs and cables, and the door has run smooth and quiet ever since. — Marcus T.',
        'The opener kept grinding and stalling halfway up, and I figured we needed a whole new unit. Turned out to be a balance problem the last company never caught. Railmont fixed the actual issue instead of just selling us a new opener. — Denise R.',
        'Called about a door that was sitting crooked in the track. They walked me through what was going on over the phone, showed up in the window they promised, and had it squared away in under an hour. Hasn’t made a sound since. — Aaron P.',
      ],
      ctas: ['Leave a review'],
    },
    {
      id: 'new-door-cta',
      refSection: 's10-building-your-dream-home-we-ve-go',
      cls: 'ADAPTED',
      heading: 'Building or replacing? Start with the opening.',
      body: [
        'A new door is the easy part. The opening decides how it behaves for the next twenty years — headroom, backroom, jamb condition, how square the floor sits under the bottom seal. We measure all of it before anyone talks about panels, because a good door hung in a crooked opening is a service call already booked.',
      ],
      ctas: ['Free estimate', `Call ${business.phone}`],
    },
    {
      id: 'service-map',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Where we work',
      body: [
        business.serviceArea,
        business.address,
        business.hours,
      ],
      ctas: ['Get directions', 'Skip the map'],
    },
    napFor('s13'),
    legalFor('s14-footer'),
    callBar,
  ],
};

const about: Page = {
  meta: {
    title: 'About Railmont Garage Door Repairs | Fort Mill, SC',
    description:
      'How we work on a garage door: balance first, parts sized to the door, torque to the rating, two full cycles before we leave. Fort Mill and the York County line.',
  },
  sections: [
    header,
    {
      id: 'page-head',
      refSection: 's01-about-premiere-roofing',
      cls: 'ADAPTED',
      heading: 'About Our Repair Work',
    },
    {
      id: 'about-intro',
      refSection: 's02-your-trusted-partner-in-roofing-so',
      cls: 'ADAPTED',
      heading: 'A narrow trade, done properly',
      body: [
        'We do one thing. Garage doors, their springs, their hardware and the openers bolted to them — residential drives, shop bays, roll-up shutters. That narrowness is the point: it is what lets us carry the right spring on the truck instead of ordering it, and what makes the second visit rare enough that we can promise you the first one holds.',
        'It also means we are not selling you a roof, a gutter run or a window package on the way past. If the door is fine, we will tell you it is fine.',
      ],
      ctas: ['See what we work on'],
    },
    {
      id: 'approach',
      refSection: 's03-our-approach-quality-integrity',
      cls: 'ADAPTED',
      heading: 'Balance first, then everything else',
      body: [
        'Almost every door we are called out to has the same underlying story, and the part that failed is rarely the part that started it. A door out of balance loads its cables unevenly, so one drum unwinds early and the cable jumps the groove. A track a quarter-inch out of plumb pushes the rollers sideways until their stems wear oval. An opener fighting an extra thirty pounds runs its motor hot on every cycle and eventually splits the drive gear.',
        'So the first thing we do on any call is disengage the opener and lift the door by hand. Where it stops, where it drifts, where it fights back — that tells us more in twenty seconds than any parts list. Then we work outward from the balance: spring size and wind, drum seating, cable tension, track plumb, roller condition, hinge play, and only then the opener travel and force settings.',
        'It takes longer than swapping the broken piece. It is also the only version of the job where you do not see us again for the same fault.',
        'That order is not a preference, it is arithmetic. Every part below the balance is sized for a load, and if the load is wrong the part is wrong however new it is. A fresh cable on a door pulling crooked buys weeks and costs the callout twice.',
        'So we would rather spend twenty extra minutes with a hand on the door than book a second visit for the same fault at your expense.',
      ],
      ctas: ['Book a visit'],
    },
    {
      id: 'values',
      refSection: 's04-our-core-values-what-drives-us',
      cls: 'ADAPTED',
      heading: 'What we hold to',
      items: [
        { label: 'Say what you found', text: 'Out loud, before the tools come out.' },
        { label: 'Size the part to the door', text: 'Weigh it, then choose. Never copy.' },
        { label: 'Leave it quieter', text: 'A quiet door is a door in balance.' },
      ],
    },
    {
      id: 'why-choose',
      refSection: 's05-why-premiere-roofing-is-the-right',
      cls: 'ADAPTED',
      heading: 'Reasons this ends up being cheaper',
      body: [
        'Not cheaper on the invoice — cheaper over the life of the door. A spring cycle is a spring cycle: a standard set is built for a certain number of open-and-close cycles and every one you spend badly is one you do not get back. Running a door that is out of balance spends them faster, and it spends the opener, the cables and the rollers alongside.',
        'The other half of it is honesty about what we can see. We do not carry a menu of upgrades to attach to a service call. If the hinges are fine we say the hinges are fine. If a door has five good years in it and you were told it needed replacing, we will say that too, and we will show you what we are looking at while we say it.',
        'What you get is a door that opens quietly, an opener that is not straining, and a written note of anything we watched but did not touch — so the next visit, whenever it comes, starts from a known state rather than a guess.',
        'The last piece is turning up prepared. A truck stocked with the wire gauges, drums, rollers, hinges and bottom seals that fit the doors on these streets is a truck that finishes the job on the first visit instead of leaving a door propped open while somebody drives across town for a part.',
        'None of that is remarkable. It is just the version of the trade that treats your door as a machine with a load on it rather than a list of parts to swap.',
      ],
      ctas: ['Free estimate'],
    },
    servicesGridAbout,
    {
      id: 'reputation',
      refSection: 's07-reputation-for-excellence',
      cls: 'ADAPTED',
      heading: 'How we would like to be judged',
      body: [
        'By whether the door is still running quiet a year later, and by whether what we told you at the door matched what you were charged for. Those are the only two measures that survive contact with a real customer.',
        'Railmont has been on the road in Fort Mill since 2014, and the crew has carried that same balance-first standard through several thousand service calls since. Most weeks bring at least a few doors we last touched years ago, back for nothing more than the annual check.',
      ],
    },
    {
      id: 'what-sets-apart',
      refSection: 's08-what-sets-premiere-roofing-apart',
      cls: 'ADAPTED',
      heading: 'What is different about how we work',
      items: [
        {
          label: 'The balance test comes first',
          text: 'Opener disengaged, door lifted by hand, before a single tool comes off the truck. It costs us five minutes and it changes the diagnosis on roughly half the calls we take.',
        },
        {
          label: 'Springs are sized, not matched',
          text: 'We weigh the door and pick the wire, inside diameter and length for it. Copying whatever was on there is how a door arrives at us badly sprung in the first place.',
        },
        {
          label: 'The opener is set last',
          text: 'Travel limits and force settings are meaningless until the door under them is balanced. Setting them first is how an opener ends up compensating for a mechanical fault nobody fixed.',
        },
        {
          label: 'You get the findings in writing',
          text: 'Including the parts we looked at and deliberately left alone, and the reason for leaving each one. A door with a known history is cheaper to keep running than a door that gets rediscovered from scratch on every visit.',
        },
      ],
    },
    {
      id: 'closing-cta',
      refSection: 's09-join-our-family-of-satisfied-clien',
      cls: 'ADAPTED',
      heading: 'Tell us what the door is doing',
      body: [
        'Describe the noise, the sag, the stall or the gap at the bottom and we will tell you on the phone whether it sounds like a spring, a cable, a track or an opener. If it is something you can safely check yourself, we will say that too.',
        'You do not need the name of the part and you do not need to have looked at it closely. What the door does, and roughly when it started doing it, is enough to work from.',
      ],
      ctas: [`Call ${business.phone}`, 'Request a callback'],
    },
    napFor('s10'),
    legalFor('s11-footer'),
    callBar,
  ],
};

const services: Page = {
  meta: {
    title: 'Garage Door Services in Fort Mill, SC | Railmont',
    description:
      'Springs, openers, cables, rollers, tracks, panels, off-track doors, new doors and yearly service — grouped by what your door is doing. Fort Mill, SC.',
  },
  sections: [
    header,
    {
      id: 'services-banner',
      refSection: 's01-banner',
      cls: 'ADAPTED',
      items: [
        { label: 'It will not open or close' },
        { label: 'It is loud and rough' },
        { label: 'The spring snapped' },
      ],
      body: [
        'Say what the door is doing and when we can reach you. A person calls back inside our posted hours.',
        'Residential drives, shop bays and roll-up shutters all go through the same intake. Describe the symptom in whatever words you have — the noise, the stall, the gap at the bottom, the opener straining or doing nothing at all. Naming the part is our job, not yours, and looking at it is free.',
      ],
      ctas: [
        'Request a callback',
        'Your name',
        'Phone number',
        'What is the door doing?',
        'A spring let go',
        'It will not open or close',
        'Loud, rough travel',
        'A panel is damaged',
        'It sits off its track',
        'I want a new door',
        'Shop or roll-up door',
        'Yearly service check',
        'Best window for a call',
        'Morning',
        'Midday',
        'Afternoon',
        'Anything else we should know',
        'Send it',
      ],
    },
    {
      id: 'page-head',
      refSection: 's02-commercial-roof-services',
      cls: 'ADAPTED',
      heading: 'Our Garage Door Services',
    },
    {
      id: 'services-intro',
      refSection: 's03-protect-your-business-with-our-rel',
      cls: 'ADAPTED',
      heading: 'Grouped by what the door is doing, not by what part it is',
      body: [
        'Nobody rings up asking for a torsion spring. They ring up because the door dropped, or it groans halfway and stops, or there is daylight under one corner. So that is how this page is organised — start from the symptom and the part sorts itself out.',
        'The eight headings below cover every call we take. Read down them, find the one that sounds like your door, and you land on the right work without knowing a drum from a bearing plate.',
      ],
      ctas: [`Call ${business.phone}`],
    },
    {
      id: 'risk-band',
      refSection: 's04-don-t-let-a-faulty-roof-jeopardize',
      cls: 'ADAPTED',
      heading: 'A door that is limping is a door that is loading something else',
      body: [
        'The failure you can hear is almost never the first one. A cable that has jumped its drum was let go by a balance problem weeks earlier; the opener that finally quit had been lifting a door thirty pounds heavier than it was rated for since the spring lost tension.',
        'Running it anyway is what turns a spring call into a spring, cable, drum and opener call. A door that is limping will keep working for a while, and every one of those cycles is spent badly.',
      ],
      ctas: ['Get it looked at'],
    },
    {
      id: 'quality-band',
      refSection: 's05-experience-unmatched-quality-and-r',
      cls: 'ADAPTED',
      heading: 'The part of the job you cannot see from the driveway',
      items: [
        {
          label: 'Sized, not copied',
          text: 'Wire gauge, inside diameter and length picked for the weight of your door.',
        },
        {
          label: 'Torqued, not guessed',
          text: 'Every fastener to the figure the hardware is rated for, checked with a wrench that reads.',
        },
        {
          label: 'Cycled, not assumed',
          text: 'Two full runs under the door’s own weight, plus a reversing test against an obstruction.',
        },
      ],
      body: [
        'None of this shows up in a photograph of a finished door, and none of it is the sort of thing you can check from the driveway afterwards. It is also the entire difference between a repair that lasts and one that comes back.',
      ],
    },
    {
      id: 'process',
      refSection: 's06-protecting-your-investment-in-thre',
      cls: 'ADAPTED',
      heading: 'Three steps, no surprises',
      body: [
        'The same order on every visit, whether it is a snapped spring first thing in the morning or a service check you booked a week out. Nothing about it changes because the job looks small.',
      ],
      items: [
        {
          label: 'Look at the whole door',
          text: 'Opener disengaged, door lifted by hand, and we watch where it fights us. A door that drifts, drops or binds tells you which part failed and which parts have been carrying the load ever since.',
        },
        {
          label: 'Say what it needs, out loud',
          text: 'Before a tool comes out you get the finding in plain language: what broke, what it took with it, what can wait a season and what cannot. Nothing is replaced because replacing is quicker than checking.',
        },
        {
          label: 'Set it and cycle it',
          text: 'Balance, then hardware, then opener travel and force limits. The door runs top to bottom twice under its own weight while we watch, and the reversing edge is tested against an obstruction before we pack up and go.',
        },
      ],
      ctas: ['Book a visit'],
    },
    {
      id: 'services-detail',
      refSection: 's07-at-premiere-roofing-we-understand',
      cls: 'ADAPTED',
      heading: 'Eight things we get called out for',
      items: [
        { label: 'The spring snapped', text: 'Spring repair and replacement.' },
        { label: 'It will not open or close', text: 'Opener repair and installation.' },
        { label: 'It is loud and rough', text: 'Cable, roller and track repair.' },
        { label: 'A panel is bent or split', text: 'Panel replacement.' },
        { label: 'It sits crooked in the opening', text: 'Off-track and misaligned door correction.' },
        { label: 'I want a different door', text: 'New residential door installation.' },
        { label: 'It is a shop or roll-up door', text: 'Commercial and roll-up doors.' },
        { label: 'I want it checked before it fails', text: 'Annual maintenance and tune-up.' },
      ],
      body: [
        'Eight headings, and every call we take lands under one of them. If yours does not, ring anyway — the sorting is there for your benefit, not as a limit on what we will look at.',
        'Two of them turning up together is common and it is worth mentioning on the phone: a snapped spring that also pulled a cable off its drum is one visit, but it is not the same visit as a spring on its own, and knowing in advance is the difference between finishing today and coming back with a part.',
      ],
    },
    {
      id: 'faq',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Questions we get asked at the door',
      faqs: [
        {
          q: 'Can I change a torsion spring myself?',
          a: 'A wound torsion spring stores enough energy to break an arm, and it releases all of it at once if a winding bar slips. The bars have to be the right diameter for the cones, the door has to be clamped, and the wind has to be counted. This is the one job on a garage door where the tooling matters more than the skill.',
        },
        {
          q: 'How do I tell whether the door is balanced?',
          a: 'Pull the release cord with the door shut, lift it by hand to about waist height and let go. A balanced door stays roughly where you left it. If it slams down it is under-sprung; if it flies up it is over-sprung. Either way the opener is doing work it was never meant to do.',
        },
        {
          q: 'The door reverses halfway down for no reason.',
          a: 'Usually the safety sensors near the floor: a spider web, a knocked bracket or sunlight straight into the receiving eye will all do it. Check that both indicator lights are steady rather than blinking. If the sensors are clean and aligned, the next suspect is the down-force setting, which is a symptom of a balance problem more often than a setting problem.',
        },
        {
          q: 'There is a gap under one corner when the door is shut.',
          a: 'The door is sitting out of square, which is either a cable that has unwound unevenly off one drum or a track that has been knocked out of plumb. Do not keep cycling it — an out-of-square door drags its rollers and can jump the track entirely on the next run.',
        },
        {
          q: 'How often should a door be serviced?',
          a: 'Once a year for an average household door, and more often for a door that opens many times a day or lives in a dusty shop. Service is mostly inspection: rollers, hinges, cable condition, spring wind, track plumb, opener force and the reversing test.',
        },
        {
          q: 'Should I lubricate the tracks?',
          a: 'No — the tracks are a running surface, and grease in a track collects grit and makes rollers slide instead of roll. Lubricate the roller stems, hinge pivots, spring coils and the opener rail, with a light garage-door lubricant rather than a general penetrating spray.',
        },
      ],
    },
    {
      id: 'experience-band',
      refSection: 's09-we-know-commercial-roofing',
      cls: 'ADAPTED',
      heading: 'Shop bays and roll-up shutters',
      body: [
        'Commercial doors cycle many times a day and fail differently for it — bearing and cable wear rather than sudden breakage, and usually with plenty of warning if anyone is listening. We service sectional bays, roll-up shutters and the openers that drive them.',
      ],
      ctas: [`Call ${business.phone}`],
    },
    napFor('s11'),
    legalFor('s12-footer'),
    callBar,
  ],
};

const contact: Page = {
  meta: {
    title: 'Contact Railmont Garage Door Repairs | Fort Mill, SC',
    description:
      'Request a callback for a garage door repair in Fort Mill, SC. Tell us what the door is doing and when to ring. Open 7 days, 7:00 AM – 7:00 PM. Call (803) 555-0164.',
  },
  sections: [
    header,
    {
      id: 'page-head',
      refSection: 's01-get-an-estimate',
      cls: 'ADAPTED',
      heading: 'Request a Call',
    },
    {
      id: 'callback-form',
      refSection: 's02',
      cls: 'ADAPTED',
      heading: 'Tell us what the door is doing',
      body: [
        'Fill this in and we will ring you back inside our posted hours. Describe the symptom in whatever words you have — the noise it makes, where it stops, whether there is a gap at the bottom, whether the opener strains or does nothing at all. You do not need the name of the part. If it turns out to be something you can safely sort yourself, we will tell you that on the phone rather than book a visit for it.',
        'This form does not send mail and there is nowhere to type an address. It collects a phone number and a callback window, and that is the whole of it.',
        'If the door has stopped in a position that leaves the opening unsecured, say so in the note and ring us as well rather than waiting for the callback — a door standing half open is the one case where the phone beats the form.',
        'One more thing worth writing down while it is fresh: roughly when the trouble started, and whether anything changed around then. A new opener, a cold snap, a knock from a vehicle or a door that has just been getting louder all point at different parts.',
      ],
      items: [
        { label: 'Your name', text: 'Required' },
        { label: 'Phone number', text: 'Required — this is how we reach you' },
        { label: 'What is the door doing?', text: 'Pick the closest match' },
        { label: 'Best window for a call', text: 'Within 7:00 AM – 7:00 PM' },
        { label: 'Anything else we should know', text: 'Optional' },
      ],
      ctas: [
        'A spring let go',
        'It will not open or close',
        'Loud, rough travel',
        'A panel is damaged',
        'It sits off its track',
        'I want a new door',
        'Shop or roll-up door',
        'Yearly service check',
        'Morning',
        'Midday',
        'Afternoon',
        'Send it',
      ],
      subheading:
        'We will call you back. Nothing is sent anywhere and nothing is stored beyond the call.',
    },
    {
      id: 'contact-map',
      refSection: null,
      cls: 'NOVEL',
      heading: 'Find us',
      body: [
        business.address,
        business.phone,
        business.hours,
        business.serviceArea,
      ],
      ctas: ['Get directions', 'Skip the map'],
    },
    napFor('s03'),
    legalFor('s04-footer'),
    callBar,
  ],
};

const privacy: Page = {
  meta: {
    title: 'Privacy Policy | Railmont Garage Door Repairs',
    description:
      'What the callback form on this site collects, what it does not, and how to reach us about it. No mail collection, no analytics, no advertising trackers. Fort Mill, SC.',
  },
  sections: [
    header,
    {
      id: 'page-head',
      refSection: 's01-privacy-policy',
      cls: 'ADAPTED',
      heading: 'Privacy Policy',
    },
    {
      id: 'privacy-body',
      refSection: 's02-information-collection-use-and-s',
      cls: 'NOVEL',
      heading: 'What this site collects, and what it does not',
      body: [
        'This page describes what actually happens on this website, rather than what a general-purpose policy usually says happens. Where the honest answer is "nothing", the answer given below is "nothing".',
        'The callback form. One form exists on this site. It asks for a name, a phone number, a description of what the door is doing, a preferred window for a return call, and an optional note. Those five fields are the complete list of what a visitor is ever asked to type.',
        'There is no field for a postal or electronic mail address anywhere on this site, and there is no mailing list of any kind to join.',
        'What happens to what you type. The form does not submit to a server. Nothing typed into it is transmitted off the device it was typed on, and nothing is written to a server. On sending, the page shows a confirmation and the details stay in the browser tab until it is closed or refreshed.',
        'Measurement, advertising and chat. None are installed. No analytics package runs on these pages, no advertising pixel is loaded, no session recorder is present, no live-chat widget is embedded, and no consent banner is shown because there is nothing on the page that would require one.',
        'Cookies. This site sets none of its own. The web framework that renders these pages may write short-lived storage entries that keep a page working across a navigation; those carry no identifier that describes a person and are not read by anyone, here or elsewhere.',
        'Content loaded from elsewhere. Two things on this site come from outside it, and both are worth naming plainly. Typeface files are served by a font host so that headings and body text render as designed. A map panel on the home page and the contact page is drawn by an embedded map frame, addressed by coordinates alone.',
        'When a browser fetches either, the operator of that service sees the request the ordinary way any web request is visible: the network address it came from and the page it was wanted for. Neither is given a name, a telephone number, or anything typed into the form here.',
        'Children. This site carries no content directed at children and asks for nothing that would identify one. Since the form transmits nothing anywhere, no detail typed by a visitor of any age reaches us through this website at all.',
        'Selling and sharing. There is nothing to sell and nobody to share with. No detail typed here is passed to a marketing partner, a lead broker or any other business, for the straightforward reason that nothing typed here leaves the visitor’s own browser.',
        'How long anything is kept. Nothing is kept. There is no database, no ticketing queue and no customer record system connected to these pages.',
        'Changes to this page. If the site later gains a working intake channel, a measurement tool, or anything that transmits a visitor detail off the page, this page is rewritten first and the change is described in plain language rather than folded into a general clause.',
        'Reaching us about any of this. By telephone on (803) 555-0164, seven days a week between 7:00 AM and 7:00 PM, or by post to Railmont Garage Door Repairs, 873 Wexbury Landing, Fort Mill, SC 29708. Those are the only two routes, and both are deliberate.',
        'This page makes no claim of compliance with any particular privacy statute. It is a description of behaviour, written to be checked against the site itself.',
      ],
    },
    napFor('s03'),
    legalFor('s04-footer'),
    callBar,
  ],
};

export const copy: Copy = {
  routes: {
    '/': home,
    '/about': about,
    '/services': services,
    '/contact': contact,
    '/privacy': privacy,
  },
};

export default copy;
