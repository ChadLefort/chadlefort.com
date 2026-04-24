export type NavLink = {
  href: string;
  label: string;
  icon: string;
  external?: boolean;
  hash?: boolean;
};

export const homeNav: NavLink[] = [
  { href: '/#job-experience', label: 'Job Experience', icon: 'lucide:briefcase', hash: true },
  { href: '/#skills', label: 'Skills', icon: 'lucide:code-2', hash: true },
  { href: '/#education', label: 'Education', icon: 'lucide:graduation-cap', hash: true },
  { href: '/#about-me', label: 'About Me', icon: 'lucide:user', hash: true },
  { href: '/#contact', label: 'Contact', icon: 'lucide:mail', hash: true },
  { href: '/projects', label: 'Projects', icon: 'lucide:layout-dashboard' }
];
