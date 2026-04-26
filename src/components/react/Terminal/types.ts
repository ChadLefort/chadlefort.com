import type { IconifyIcon } from '@iconify/react';

export type MdLine =
  | { kind: 'h1'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'li'; text: string }
  | { kind: 'bq'; text: string }
  | { kind: 'blank' };

export type TabProps = {
  idx?: number;
  mobileIdx?: number;
  icon: IconifyIcon;
  label: string;
  active?: boolean;
  href?: string;
  hideOnMobile?: boolean;
  tone?: 'default' | 'session';
};

export type SegmentProps = {
  icon?: IconifyIcon;
  text?: string;
  tone?: 'fg' | 'branch' | 'add' | 'del' | 'info';
  hideOnMobile?: boolean;
};

export type SepProps = { hideOnMobile?: boolean };
