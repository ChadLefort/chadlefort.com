import type { LucideIcon } from 'lucide-react';

export type MdLine =
  | { kind: 'h1'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'li'; text: string }
  | { kind: 'bq'; text: string }
  | { kind: 'blank' };

export type TabProps = {
  idx?: number;
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href?: string;
  hideOnMobile?: boolean;
};

export type SegmentProps = {
  icon?: LucideIcon;
  text?: string;
  tone?: 'fg' | 'branch' | 'add' | 'del' | 'info';
  hideOnMobile?: boolean;
};

export type SepProps = { hideOnMobile?: boolean };
