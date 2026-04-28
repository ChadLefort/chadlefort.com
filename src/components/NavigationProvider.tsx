import { navigate } from 'astro:transitions/client';
import type { FC, ReactNode } from 'react';
import { RouterProvider } from 'react-aria-components';

type Props = { children: ReactNode };

export const NavigationProvider: FC<Props> = ({ children }) => (
  <RouterProvider navigate={(href) => void navigate(href)}>{children}</RouterProvider>
);
