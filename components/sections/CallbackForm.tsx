// STUB: no submission target
//
// The five-field callback form (D-05, docs/behavior/06). LEAD-OWNED: it is mounted
// three times — `hero` on `/`, `services-banner` on `/services`, `callback-form` on
// `/contact` — and three route agents editing one validation routine is exactly the
// shared-file collision A-6 exists to prevent.
//
// NO ELECTRONIC MAIL ANYWHERE (D-03). There is no address field, no address-typed
// input, no submission target and no backend. Nothing typed here leaves the browser.
//
// Every instance is independent: local state, no context, no persistence. Navigating
// away unmounts it and everything is discarded, which is what the privacy policy says.

'use client';

import { useId, useRef, useState } from 'react';
import { facts, telHref } from '@/lib/business';

interface Labels {
  readonly name: string;
  readonly phone: string;
  readonly service: string;
  readonly window: string;
  readonly message: string;
}

interface Props {
  readonly labels: Labels;
  readonly serviceOptions: readonly string[];
  readonly windowOptions: readonly string[];
  readonly submitLabel: string;
  /** Shown in the confirmation panel. Comes from content/copy.ts, never written here. */
  readonly doneText: string;
  /** Optional per-field hints from the copy module's `items`. */
  readonly hints?: Partial<Record<keyof Labels, string>>;
}

type FieldKey = 'name' | 'phone' | 'service' | 'window';

/** Permissive digit count, not a pattern (spec 06). "(803) 555-0164" must pass. */
const phoneOk = (v: string) => {
  const digits = v.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
};

/** Ten digits formatted on blur; anything else is left exactly as typed. */
const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '');
  if (d.length !== 10) return v;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export default function CallbackForm({
  labels, serviceOptions, windowOptions, submitLabel, doneText, hints,
}: Props) {
  const uid = useId();
  const [values, setValues] = useState({ name: '', phone: '', service: '', window: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [sent, setSent] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (k: FieldKey, v: string): string | undefined => {
    if (k === 'name') return v.trim() ? undefined : `${labels.name} is required.`;
    if (k === 'phone') {
      if (!v.trim()) return `${labels.phone} is required.`;
      return phoneOk(v) ? undefined : 'Enter a 10-digit phone number.';
    }
    if (k === 'service') return v ? undefined : `${labels.service} is required.`;
    return v ? undefined : `${labels.window} is required.`;
  };

  const setValue = (k: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    // Re-validate on input ONLY once a field has already failed, so nobody is told
    // their phone number is wrong after one digit (spec 06).
    if (k !== 'message' && touched[k]) {
      setErrors((e) => ({ ...e, [k]: validate(k, v) }));
    }
  };

  const onBlur = (k: FieldKey) => {
    setTouched((t) => ({ ...t, [k]: true }));
    const next = k === 'phone' ? formatPhone(values.phone) : values[k];
    if (k === 'phone' && next !== values.phone) setValues((s) => ({ ...s, phone: next }));
    setErrors((e) => ({ ...e, [k]: validate(k, next) }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keys: FieldKey[] = ['name', 'phone', 'service', 'window'];
    const next: Partial<Record<FieldKey, string>> = {};
    for (const k of keys) next[k] = validate(k, values[k]);
    setErrors(next);
    setTouched({ name: true, phone: true, service: true, window: true });
    const firstBad = keys.find((k) => next[k]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${firstBad}`)}`)?.focus();
      return;
    }
    // eslint-disable-next-line no-console
    console.warn('STUB: no submission target. Nothing was transmitted.');
    setSent(true);
    // Spec 06 failure mode 3: replacing the form without moving focus drops it to
    // <body> and a screen-reader user hears nothing.
    window.requestAnimationFrame(() => doneRef.current?.focus());
  };

  if (sent) {
    return (
      <div className="form-panel">
        <div className="form-done" ref={doneRef} role="status" tabIndex={-1}>
          <p>{doneText}</p>
          <p style={{ marginTop: 'var(--spacing-md)' }}>
            <a className="action-quiet" href={telHref}>{facts.phone}</a>
          </p>
        </div>
      </div>
    );
  }

  const err = (k: FieldKey) =>
    errors[k] ? (
      <p className="field-error" id={`${uid}-${k}-error`}>{errors[k]}</p>
    ) : null;

  const aria = (k: FieldKey) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${uid}-${k}-error` : hints?.[k] ? `${uid}-${k}-hint` : undefined,
  } as const);

  const hint = (k: keyof Labels) =>
    hints?.[k] ? <span className="form-hint" id={`${uid}-${k}-hint`}>{hints[k]}</span> : null;

  const summary = Object.values(errors).filter(Boolean).length;

  return (
    <form className="form-panel" ref={formRef} noValidate onSubmit={onSubmit}>
      <div aria-live="polite" className="form-summary">
        {summary ? `${summary} field${summary === 1 ? '' : 's'} need attention.` : ''}
      </div>

      <div className="field">
        <label htmlFor={`${uid}-name`}>{labels.name}</label>
        {hint('name')}
        <input
          autoComplete="name"
          id={`${uid}-name`}
          name="name"
          onBlur={() => onBlur('name')}
          onChange={(e) => setValue('name', e.target.value)}
          type="text"
          value={values.name}
          {...aria('name')}
        />
        {err('name')}
      </div>

      <div className="field">
        <label htmlFor={`${uid}-phone`}>{labels.phone}</label>
        {hint('phone')}
        <input
          autoComplete="tel"
          id={`${uid}-phone`}
          inputMode="tel"
          name="phone"
          onBlur={() => onBlur('phone')}
          onChange={(e) => setValue('phone', e.target.value)}
          type="tel"
          value={values.phone}
          {...aria('phone')}
        />
        {err('phone')}
      </div>

      <div className="field">
        <label htmlFor={`${uid}-service`}>{labels.service}</label>
        {hint('service')}
        <select
          id={`${uid}-service`}
          name="service"
          onBlur={() => onBlur('service')}
          onChange={(e) => setValue('service', e.target.value)}
          value={values.service}
          {...aria('service')}
        >
          <option value="" />
          {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {err('service')}
      </div>

      <div className="field">
        <label htmlFor={`${uid}-window`}>{labels.window}</label>
        {hint('window')}
        <select
          id={`${uid}-window`}
          name="window"
          onBlur={() => onBlur('window')}
          onChange={(e) => setValue('window', e.target.value)}
          value={values.window}
          {...aria('window')}
        >
          <option value="" />
          {windowOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {err('window')}
      </div>

      <div className="field">
        <label htmlFor={`${uid}-message`}>{labels.message}</label>
        {hint('message')}
        <textarea
          id={`${uid}-message`}
          name="message"
          onChange={(e) => setValue('message', e.target.value)}
          value={values.message}
        />
      </div>

      <div style={{ marginTop: 'var(--spacing-lg)' }}>
        {/* The ONE filled chromatic action rule counts the call CTA; a form submit is a
            neutral control, not a competing chromatic action, so it is painted in the
            primary rather than the accent. rendertruth.mjs ranks by chroma: primary is
            0.0341 against the accent's 0.1655, so the call CTA stays dominant. */}
        <button className="form-submit" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
