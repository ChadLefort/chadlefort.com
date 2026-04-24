import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Briefcase, Code2, GraduationCap, Home, LayoutDashboard, Mail, Menu, User, X } from 'lucide-react';
import { Button as RACButton, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from 'react-aria-components';
import type { NavLink } from '~/data/nav';
import { buttonStyles } from '~/components/react/ui/Button';

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
          className: 'text-nav-fg'
        })}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </RACButton>

      <ModalOverlay
        isDismissable
        className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out data-[entering]:opacity-0 data-[exiting]:opacity-0"
      >
        <Modal className="glass-strong text-fg h-full w-80 max-w-full transform-gpu shadow-2xl transition-transform duration-300 ease-out data-[entering]:translate-x-full data-[exiting]:translate-x-full motion-reduce:transition-none">
          <Dialog className="flex h-full flex-col outline-none">
            <div className="border-glass-border flex items-center justify-between border-b px-4 py-3">
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
                    className="focus-visible:ring-accent flex items-center gap-3 rounded-lg px-3 py-3 font-semibold transition hover:bg-white/5 focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <Icon className="text-fg-muted h-5 w-5" aria-hidden="true" />
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
