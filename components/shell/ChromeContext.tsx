'use client';

// The drawer's open state is owned here rather than inside the header, because
// TWO pieces of chrome need it and they are not in the same subtree:
//   - the header renders the toggle and the panel;
//   - the mobile call bar must go `inert` while the drawer is open, or a trapped
//     focus cycle can still reach it (spec 03, third failure mode).
// The call bar is the LAST element in the document and the header is the first,
// so a shared provider around both is the only place the state can live.

import { createContext, useContext, useState } from 'react';

interface Chrome {
  readonly drawerOpen: boolean;
  readonly setDrawerOpen: (open: boolean) => void;
}

const ChromeCtx = createContext<Chrome>({ drawerOpen: false, setDrawerOpen: () => {} });

export const useChrome = () => useContext(ChromeCtx);

export function ChromeProvider({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return <ChromeCtx.Provider value={{ drawerOpen, setDrawerOpen }}>{children}</ChromeCtx.Provider>;
}
