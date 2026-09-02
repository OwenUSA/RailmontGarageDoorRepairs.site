'use client';

// Mobile sticky call bar — docs/behavior/03. LEAD-OWNED, FROZEN AFTER PROMPT 5.
// Class NOVEL: the reference has no counterpart band, so it is measured by token
// conformance rather than against anything.
//
// D-04: the phone number is the conversion. One primary target, not a toolbar.
// No scroll listener, no show-on-scroll-up, no dismiss button, no entrance
// animation — a bar that appears and disappears is a bar the user cannot rely on.
//
// NOT RENDERED above 768 — genuinely absent from the DOM, not hidden with
// display:none while still in the accessibility tree. That is why this is a
// client component with a matchMedia read rather than a CSS-only band.

import { useEffect, useState } from 'react';
import { copy } from '@/content/copy';
import { facts, telHref } from '@/lib/business';
import { useChrome } from './ChromeContext';

const bar = copy.routes['/'].sections.find((s) => s.id === 'call-bar');
const LABEL = bar?.ctas?.[0] ?? '';
const HOURS = bar?.body?.[0] ?? '';

export default function CallBar() {
  const { drawerOpen } = useChrome();
  // Starts TRUE so the bar is server-rendered and survives a JS-less load (spec
  // 08 acceptance 5). The effect removes it from the DOM above 768; the CSS also
  // carries a display:none at that width purely as the no-JS safety net, so the
  // normal case is genuine absence rather than a hidden node in the a11y tree.
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767.98px)');
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  if (!mobile) return null;

  return (
    <div
      className="call-bar"
      data-section="call-bar"
      role="region"
      aria-label={`Call ${facts.name}`}
      // The drawer sits above this bar; without inert, a trapped focus cycle can
      // still reach it (spec 03, third failure mode).
      {...(drawerOpen ? { inert: true } : {})}
    >
      <a className="action-call" href={telHref}>
        {LABEL}
      </a>
      <p className="call-bar__hours">{HOURS}</p>
    </div>
  );
}
