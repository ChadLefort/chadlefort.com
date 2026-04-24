import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Briefcase, Code2, GraduationCap, Home, LayoutDashboard, Mail, Menu, User, X } from 'lucide-react';
import { Button as RACButton, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from 'react-aria-components';
import type { NavLink } from '~/data/nav';
import { buttonStyles } from '~/utils/styles';

type Props = { links: NavLink[] };

const iconMap: Record<string, typeof Home> = {
  'lucide:briefcase': Briefcase,
  'lucide:code-2': Code2,
  'lucide:graduation-cap': GraduationCap,
  'lucide:user': User,
  'lucide:mail': Mail,
  'lucide:layout-dashboard': LayoutDashboard,
  'lucide:home': Home
};

export const MobileDrawer: FC<Props> = ({ links }) => {
  const [isOpen, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onPageLoad = () => setOpen(false);

    document.addEventListener('astro:after-swap', onPageLoad);

    return () => document.removeEventListener('astro:after-swap', onPageLoad);
  }, []);

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
      <RACButton
        ref={triggerRef}
        aria-label="Open navigation menu"
        className={buttonStyles({
          variant: 'ghost',
          color: 'neutral',
          size: 'md',
          shape: 'icon',
          className: 'text-[var(--nav-fg)]'
        })}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </RACButton>

      <ModalOverlay isDismissable className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        <Modal className="glass-strong h-full w-80 max-w-full text-[var(--text)] shadow-2xl">
          <Dialog className="flex h-full flex-col outline-none">
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-4 py-3">
              <Heading slot="title" className="font-display text-lg">
                Menu
              </Heading>
              <RACButton
                slot="close"
                aria-label="Close menu"
                className={buttonStyles({ variant: 'ghost', color: 'neutral', size: 'md', shape: 'icon' })}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </RACButton>
            </div>

            <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
              {links.map((link) => {
                const Icon = iconMap[link.icon] ?? LayoutDashboard;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 font-semibold transition hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:outline-none"
                  >
                    <Icon className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
};
