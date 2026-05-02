import { useStore } from '@nanostores/react';
import { atom, onMount } from 'nanostores';
import { FALLBACK_HOST, getSiteHost } from '~/components/Terminal/utils';

const $siteHost = atom(FALLBACK_HOST);

onMount($siteHost, () => {
  $siteHost.set(getSiteHost());
});

export const useSiteHost = () => useStore($siteHost, { ssr: 'initial' });
