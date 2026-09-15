export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV_LINKS: NavLink[] = [
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
