export const site = {
  title: 'Chad Lefort - Senior Frontend Engineer',
  name: 'Chad Lefort',
  jobTitle: 'Senior Frontend Engineer',
  siteUrl: 'https://chadlefort.com',
  description: `I'm Chad Lefort, a senior frontend engineer from Mandeville, Louisiana with ${new Date().getFullYear() - 2013}+ years of development experience.`,
  lang: 'en-US',
  email: 'chadlefort@gmail.com',
  ogImage: '/card.png',
  avatar: '/me.png',
  social: {
    github: 'https://github.com/ChadLefort',
    linkedin: 'https://www.linkedin.com/in/chadlefort',
    twitter: 'https://twitter.com/ChadLefort',
    instagram: 'https://instagram.com/cl_skate/',
    youtube: 'https://www.youtube.com/chadlefort'
  }
} as const;

export const yearsOfExperience = () => new Date().getFullYear() - 2013;
