import { Briefcase, Code2, GraduationCap, Home, LayoutDashboard, Mail, Menu, User, X } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, Heading, Link, Modal, ModalOverlay } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { IconButton } from '~/components/IconButton';
import { NavigationProvider } from '~/components/NavigationProvider';
import type { NavLink } from '~/data/nav';

const overlay = tv({
  base: [
    'fixed inset-0 z-50 flex justify-end',
    'bg-ink-950/24 dark:bg-ink-950/50',
    'transition-opacity duration-200 ease-out',
    'data-[entering]:opacity-0 data-[exiting]:opacity-0'
  ]
});

const modal = tv({
  base: [
    'h-full w-80 max-w-full transform-gpu',
    'bg-surface text-fg border-border-subtle border-l shadow-lg',
    'transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
    'data-[entering]:translate-x-full data-[exiting]:translate-x-full'
  ]
});

const drawerLink = tv({
  base: ['flex items-center gap-3 rounded-lg px-3 py-3 font-medium transition-colors', 'hover:bg-surface-alt'],
  variants: {
    isFocusVisible: {
      true: 'outline-accent outline-2 -outline-offset-2'
    },
    isHovered: {
      true: 'bg-surface-alt'
    }
  }
});

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
  // react-doctor-disable-next-line react-doctor/prefer-use-sync-external-store
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const onPageLoad = () => setOpen(false);

    document.addEventListener('astro:after-swap', onPageLoad);

    return () => document.removeEventListener('astro:after-swap', onPageLoad);
  }, []);

  return (
    <NavigationProvider>
      <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <IconButton label="Open navigation menu" icon={<Menu className="size-6" />} className="text-nav-fg" />

        <ModalOverlay isDismissable className={overlay()}>
          <Modal className={modal()}>
            <Dialog className="flex h-full flex-col outline-none">
              <Heading slot="title" className="sr-only">
                Menu
              </Heading>
              <div className="border-border-subtle flex items-center justify-end border-b px-4 py-3">
                <IconButton slot="close" label="Close menu" icon={<X className="size-6" />} />
              </div>

              <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
                {links.map((link) => {
                  const Icon = iconMap[link.icon] ?? LayoutDashboard;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onPress={() => setOpen(false)}
                      className={(rp) => drawerLink(rp)}
                    >
                      <Icon className="text-fg-muted size-5" aria-hidden="true" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </NavigationProvider>
  );
};
