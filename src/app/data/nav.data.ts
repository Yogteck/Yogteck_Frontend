export interface NavLink {
  label: string;
  url: string;
  hasDropdown?: boolean;
  isExternal?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', url: '/' },
  { label: 'Our Services', url: '/services/website-development', hasDropdown: true },
  { label: 'Our Products', url: '/products/erp-software', hasDropdown: true },
  { label: 'Tools', url: '/tools' },
  { label: 'Our Clients', url: '/clients' },
  { label: 'About Us', url: '/about' },
  { label: 'Contact', url: '/contact' }
];
