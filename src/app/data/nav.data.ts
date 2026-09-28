export interface NavLink {
  label: string;
  url: string;
  hasDropdown?: boolean;
  isExternal?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', url: '#' },
  { label: 'Our Services', url: '#services', hasDropdown: true },
  { label: 'Growth Journey', url: '#growth-journey' },
  { label: 'Marketplaces', url: '#marketplaces' },
  { label: 'Our Projects', url: '#projects' },
  { label: 'Our Clients', url: '#clients' },
  { label: 'About Us', url: '#about' },
  { label: 'Contact', url: '#contact' }
];
