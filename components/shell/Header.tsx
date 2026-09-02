'use client';

// Header + mobile drawer. LEAD-OWNED, FROZEN AFTER PROMPT 5 (A-6).
// Specs: docs/behavior/01 (drawer), docs/behavior/02 (static sticky header).
//
// The header is a TRANSPARENT FIXED OVERLAY with NO scrolled variant, because
// the reference's headerAtTop and headerScrolled computed styles are identical
// on all five pages. There is no scroll listener, no IntersectionObserver
// sentinel and no class toggling anywhere in this file — spec 02, and a scroll
// handler that changes nothing is a rAF cost on every frame for zero pixels.
//
// The drawer corrects an accessibility defect rather than cloning it: the
// reference's jQuery.mmenu toggle is an <a> wrapping two empty spans, with no
// `aria-expanded` and no `aria-controls` anywhere on any page. D-19 sets WCAG
// 2.2 AA and cloning an accessibility defect is not fidelity.

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { copy } from '@/content/copy';
import { facts, telHref } from '@/lib/business';
import { useChrome } from './ChromeContext';

const HREF: Record<string, string> = {
  Home: '/',
  About: '/about',
  Services: '/services',
  Contact: '/contact',
};

const header = copy.routes['/'].sections.find((s) => s.id === 'header');
const NAV = (header?.items ?? []).map((i) => ({ label: i.label, href: HREF[i.label] ?? '/' }));
const [CALL_LABEL, MENU_LABEL, CLOSE_LABEL] = header?.ctas ?? ['', 'Menu', 'Close'];

export default function Header() {
  const pathname = usePathname();
  const { drawerOpen, setDrawerOpen } = useChrome();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const scrollYRef = useRef(0);

  // FAILURE MODE (spec 01): a drawer whose closed state is written into the base
  // stylesheet becomes a site with no navigation the moment anything throws.
  // The transform and the `inert` are applied by this class, added on mount, so
  // without JavaScript the panel renders as a plain stacked list under the header.
  useEffect(() => {
    document.documentElement.classList.add('js-drawer-ready');
    return () => document.documentElement.classList.remove('js-drawer-ready');
  }, []);

  // Scroll lock: `position: fixed; top: -<scrollY>px`, NEVER `overflow: hidden`
  // — iOS Safari ignores overflow and the page scrolls behind the open drawer.
  // The restore runs in the cleanup as well as in the close handler, and is
  // idempotent: if this component unmounts while open, a body left fixed at a
  // negative offset renders as a blank page.
  useEffect(() => {
    const body = document.body;
    if (drawerOpen) {
      scrollYRef.current = window.scrollY;
      body.style.position = 'fixed';
      body.style.top = `-${scrollYRef.current}px`;
      body.style.width = '100%';
    }
    return () => {
      if (body.style.position !== 'fixed') return;
      const y = scrollYRef.current;
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, y);
    };
  }, [drawerOpen]);

  // Escape closes and returns focus to the toggle; focus moves to the panel's
  // close button on open. Focus is never left on a node inside an inert subtree.
  useEffect(() => {
    if (!drawerOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      // Trap between the close button and the last link in the panel.
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button');
      if (!nodes || !nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen, setDrawerOpen]);

  // Client-side route change. The App Router does not unmount the shell between
  // routes, so a link inside the drawer navigates with the drawer still open and
  // the body still locked. Navigating to the route it is already on must close
  // it too, which is why this watches the pathname value and not a click.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname, setDrawerOpen]);

  // Viewport crossing 768 upward while open: close and hand focus back, because
  // the toggle is about to be hidden.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches && drawerOpen) {
        setDrawerOpen(false);
        toggleRef.current?.focus();
      }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [drawerOpen, setDrawerOpen]);

  const isCurrent = (href: string) => pathname === href;

  return (
    <>
      <header className="site-header" data-section="header">
        <div className="page-shell site-header__inner">
          <Link href="/" className="site-logo" aria-label={`${facts.name} — home`}>
            {/* Placeholder slot `logo-header` (assets/INVENTORY.md). The generated
                wordmark + icon lockup is handed back at Prompt 10/11. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/placeholders/logo-header.svg" alt={facts.name} width={260} height={198} />
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                {...(isCurrent(n.href) ? { 'aria-current': 'page' as const } : {})}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <a className="action-call header-cta" href={telHref}>
            {CALL_LABEL}
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={drawerOpen}
            aria-controls="site-drawer"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <Menu aria-hidden="true" size={28} />
            <span className="vh">{MENU_LABEL}</span>
          </button>
        </div>
      </header>

      {/* Scrim: a sibling with a click handler, aria-hidden, and never the only
          way to close. */}
      <div
        className="drawer-scrim"
        data-open={drawerOpen ? 'true' : 'false'}
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
      />

      {/* The panel is in the DOM at all times and is moved with transform — not
          `left`, not `width`, not `display: none`. The first two lay out on every
          frame; the third destroys the focus target mid-interaction. */}
      <nav
        ref={panelRef}
        id="site-drawer"
        className="drawer"
        aria-label="Site"
        data-open={drawerOpen ? 'true' : 'false'}
        {...(drawerOpen ? {} : { inert: true, 'aria-hidden': true as const })}
      >
        <button
          ref={closeRef}
          type="button"
          className="drawer__close"
          onClick={() => {
            setDrawerOpen(false);
            toggleRef.current?.focus();
          }}
        >
          {CLOSE_LABEL}
        </button>
        <ul className="drawer__list">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} {...(isCurrent(n.href) ? { 'aria-current': 'page' as const } : {})}>
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <a className="action-call" href={telHref}>
              {CALL_LABEL}
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
