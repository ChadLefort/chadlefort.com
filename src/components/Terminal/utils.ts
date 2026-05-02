const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit'
});

export const formatTime = (date = new Date()) => timeFormatter.format(date);

const KNOWN_HOSTS = ['chadlefort.com', 'chadlefort.me'] as const;
export const FALLBACK_HOST = 'chadlefort.com';

export const getSiteHost = (): string => {
  if (typeof window === 'undefined') return FALLBACK_HOST;
  const host = window.location.hostname;

  if ((KNOWN_HOSTS as readonly string[]).includes(host)) return host;

  return FALLBACK_HOST;
};

export const getSessionLabel = (host = getSiteHost()) => host.replace(/\./g, '_');
