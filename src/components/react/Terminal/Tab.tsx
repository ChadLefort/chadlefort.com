import type { FC } from 'react';
import { tv } from 'tailwind-variants';

import type { TabProps } from './types';

const tabStyles = tv({
  base: 'inline-flex items-center gap-2 rounded-t-xl px-3 py-2 text-[12px] font-medium transition sm:px-4',
  variants: {
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
  defaultVariants: {
    active: false
  }
});

export const Tab: FC<TabProps> = ({ idx, mobileIdx, icon: Icon, label, active, href, hideOnMobile }) => {
  const className = tabStyles({ active, hideOnMobile, interactive: Boolean(href) });

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
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
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
