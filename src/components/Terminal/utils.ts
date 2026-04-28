export const formatTime = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

const KNOWN_HOSTS = ['chadlefort.com', 'chadlefort.me'] as const;
const FALLBACK_HOST = 'chadlefort.com';

export const getSiteHost = (): string => {
  if (typeof window === 'undefined') return FALLBACK_HOST;
  const host = window.location.hostname;

  if ((KNOWN_HOSTS as readonly string[]).includes(host)) return host;

  return FALLBACK_HOST;
};

export const getSessionLabel = (host = getSiteHost()) => host.replace(/\./g, '_');
