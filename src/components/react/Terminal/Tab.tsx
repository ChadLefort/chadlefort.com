import type { FC } from 'react';
import { Icon } from '@iconify/react';
import { tv } from 'tailwind-variants';

import type { TabProps } from './types';

const tabStyles = tv({
  base: 'inline-flex h-9 items-center gap-2 rounded-t-xl px-3 text-[12px] font-medium whitespace-nowrap transition sm:px-4',
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
      true: 'cursor-pointer hover:brightness-110'
    }
  },
  compoundVariants: [{ tone: 'session', class: 'bg-term-tab-session text-term-tab-session-text' }],
  defaultVariants: {
    active: false,
    tone: 'default'
  }
});

export const Tab: FC<TabProps> = ({ idx, mobileIdx, icon, label, active, href, hideOnMobile, tone }) => {
  const className = tabStyles({ active, hideOnMobile, interactive: Boolean(href), tone });

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
      <Icon icon={icon} className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="font-mono">{label}</span>
    </>
  );

  if (href) {
    const external = href.startsWith('http');

    return (
      <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
        {inner}
      </a>
    );
  }

  return <span className={className}>{inner}</span>;
};
