const location = {
  city: 'Mandeville',
  state: 'LA',
  stateLong: 'Louisiana',
  country: 'US',
  timezone: 'America/Chicago',
  timezoneShort: 'CT'
} as const;

export const locationShort = `${location.city}, ${location.state}`;
export const locationLong = `${location.city}, ${location.stateLong}`;

export const site = {
  title: 'Chad Lefort - Senior Frontend Engineer',
  name: 'Chad Lefort',
  jobTitle: 'Senior Frontend Engineer',
  siteUrl: 'https://chadlefort.com',
  description: `I'm Chad Lefort, a senior frontend engineer from ${locationLong} with ${new Date().getFullYear() - 2013}+ years of development experience.`,
  lang: 'en-US',
  email: 'chad@chadlefort.com',
  ogImage: '/card.png',
  avatar: '/me.png',
  location,
  social: {
    github: 'https://github.com/ChadLefort',
    linkedin: 'https://www.linkedin.com/in/chadlefort',
    twitter: 'https://twitter.com/ChadLefort',
    bluesky: 'https://bsky.app/profile/chadlefort.com',
    instagram: 'https://instagram.com/cl_skate/',
    youtube: 'https://www.youtube.com/chadlefort'
  }
} as const;

export const yearsOfExperience = () => new Date().getFullYear() - 2013;
