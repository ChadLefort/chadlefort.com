export type Education = {
  institution: string;
  degree: string;
  major: string;
  start: string;
  end: string;
  gpa: string;
  awards: string[];
  organizations: string[];
};

export const education: Education = {
  institution: 'Nicholls State University',
  degree: 'Bachelor of Science (B.S.)',
  major: 'Computer Information Systems',
  start: 'August 2009',
  end: 'December 2013',
  gpa: '3.6',
  awards: [
    "Consistently awarded the President's List since the Fall 2010 semester (scholastic GPA of 3.5 or higher required)."
  ],
  organizations: [
    'Member of Beta Gamma Sigma, the highest recognition for a business student at an AACSB-accredited program.',
    'Member of Upsilon Pi Epsilon, the first international honor society in the computing and information disciplines.'
  ]
};
