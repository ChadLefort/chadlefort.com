import { Icon, type IconifyIcon } from '@iconify/react';
import type { FC } from 'react';
import { Link } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const tabStyles = tv({
  base: 'box-border inline-flex h-9 transform-gpu items-center gap-2 overflow-hidden rounded-t-xl border border-transparent px-3 text-[12px] font-medium whitespace-nowrap transition sm:px-4',
  variants: {
    tone: {
      default: '',
      session: ''
    },
    active: {
      true: 'bg-term-tab-active text-term-tab-text',
      false: 'bg-term-tab-inactive text-term-fg/80'
    },
    hideOnMobile: {
      true: 'hidden sm:inline-flex'
    },
    interactive: {
      true: 'cursor-pointer'
    },
    isHovered: {
      true: 'brightness-110'
    },
    isFocusVisible: {
      true: 'outline-accent outline-2 -outline-offset-2'
    }
  },
  compoundVariants: [{ tone: 'session', class: 'bg-term-tab-session text-term-tab-session-text' }],
  defaultVariants: {
    active: false,
    tone: 'default'
  }
});

type TabProps = {
  idx?: number;
  mobileIdx?: number;
  icon: IconifyIcon;
  label: string;
  active?: boolean;
  href?: string;
  hideOnMobile?: boolean;
  tone?: 'default' | 'session';
};

export const Tab: FC<TabProps> = ({ idx, mobileIdx, icon, label, active, href, hideOnMobile, tone }) => {
  const inner = (
    <>
      {idx != null && (
        <span className="font-mono opacity-80">
          {mobileIdx != null ? (
            <>
              <span className="sm:hidden">{mobileIdx}</span>
              <span className="hidden sm:inline">{idx}</span>
            </>
          ) : (
            idx
          )}
        </span>
      )}
      <Icon icon={icon} className="shrink-0 h-4 w-4" aria-hidden="true" />
      <span className="font-mono">{label}</span>
    </>
  );

  if (!href) {
    return <span className={tabStyles({ active, hideOnMobile, tone, interactive: false })}>{inner}</span>;
  }

  const external = href.startsWith('http');

  return (
    <Link
      href={href}
      className={(rp) => tabStyles({ ...rp, active, hideOnMobile, tone, interactive: true })}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      {inner}
    </Link>
  );
};
