import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Briefcase, Code2, GraduationCap, Home, LayoutDashboard, Mail, Menu, User, X } from 'lucide-react';
import { Dialog, DialogTrigger, Heading, Link, Modal, ModalOverlay } from 'react-aria-components';
import type { NavLink } from '~/data/nav';
import { NavigationProvider } from '~/components/react/NavigationProvider';
import { IconButton } from '~/components/react/ui/IconButton';

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

  useEffect(() => {
    const onPageLoad = () => setOpen(false);

    document.addEventListener('astro:after-swap', onPageLoad);

    return () => document.removeEventListener('astro:after-swap', onPageLoad);
  }, []);

  return (
    <NavigationProvider>
      <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <IconButton label="Open navigation menu" icon={<Menu className="h-6 w-6" />} className="text-nav-fg" />

        <ModalOverlay
          isDismissable
          className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm transition-opacity duration-200 ease-out data-[entering]:opacity-0 data-[exiting]:opacity-0 dark:bg-black/60"
        >
          <Modal className="bg-nav-bg text-nav-fg border-glass-border h-full w-80 max-w-full transform-gpu border-l shadow-2xl backdrop-blur-[32px] backdrop-saturate-[180%] transition-transform duration-300 ease-out data-[entering]:translate-x-full data-[exiting]:translate-x-full motion-reduce:transition-none">
            <Dialog className="flex h-full flex-col outline-none">
              <Heading slot="title" className="sr-only">
                Menu
              </Heading>
              <div className="border-glass-border flex items-center justify-end border-b px-4 py-3">
                <IconButton slot="close" label="Close menu" icon={<X className="h-6 w-6" />} />
              </div>

              <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
                {links.map((link) => {
                  const Icon = iconMap[link.icon] ?? LayoutDashboard;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onPress={() => setOpen(false)}
                      className="focus-visible:ring-accent flex items-center gap-3 rounded-lg px-3 py-3 font-semibold transition hover:bg-black/10 focus-visible:ring-2 focus-visible:outline-none dark:hover:bg-white/5"
                    >
                      <Icon className="text-fg-muted h-5 w-5" aria-hidden="true" />
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
