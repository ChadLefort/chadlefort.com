import type { IconifyIcon } from '@iconify/react';
import { Icon } from '@iconify/react';
import apple from '@iconify-icons/simple-icons/apple';
import gnubash from '@iconify-icons/simple-icons/gnubash';
import neovim from '@iconify-icons/simple-icons/neovim';
import nodedotjs from '@iconify-icons/simple-icons/nodedotjs';
import tmux from '@iconify-icons/simple-icons/tmux';
import type { ComponentProps, FC } from 'react';

type TermIconProps = Pick<ComponentProps<'svg'>, 'className' | 'aria-hidden'>;

export type TermIcon = FC<TermIconProps>;

// Brand glyphs lucide doesn't have; everything else comes from lucide-react
const brandIcon = (icon: IconifyIcon): TermIcon => {
  const BrandIcon: TermIcon = (props) => <Icon icon={icon} {...props} />;

  return BrandIcon;
};

export const AppleIcon = brandIcon(apple);
export const GnubashIcon = brandIcon(gnubash);
export const NeovimIcon = brandIcon(neovim);
export const NodeIcon = brandIcon(nodedotjs);
export const TmuxIcon = brandIcon(tmux);
