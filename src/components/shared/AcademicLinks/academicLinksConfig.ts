import googleScholarLogo from '@/assets/labarotories/google_scholar.svg';
import webOfScienceLogo from '@/assets/labarotories/web_of_science.jpg';
import scopusLogo from '@/assets/labarotories/scopus.svg';
import researchgateLogo from '@/assets/labarotories/researchgate.svg';
import orcidLogo from '@/assets/labarotories/orcid.svg';

export type AcademicLinkKey =
  'google_scholar' | 'web_of_science' | 'scopus' | 'researchgate' | 'orcid';

export const academicLinksConfig: {
  key: AcademicLinkKey;
  label: string;
  color: string;
  bg: string;
  logo: string;
}[] = [
  {
    key: 'google_scholar',
    label: 'Google Scholar',
    color: '#4285F4',
    bg: '#EAF1FB',
    logo: googleScholarLogo,
  },
  {
    key: 'web_of_science',
    label: 'Web of Science',
    color: '#5E35B1',
    bg: '#F1EDFB',
    logo: webOfScienceLogo,
  },
  { key: 'scopus', label: 'Scopus', color: '#E9711C', bg: '#FEF0E6', logo: scopusLogo },
  {
    key: 'researchgate',
    label: 'ResearchGate',
    color: '#00CCBB',
    bg: '#E6FAF8',
    logo: researchgateLogo,
  },
  { key: 'orcid', label: 'ORCID', color: '#A6CE39', bg: '#F4FAE6', logo: orcidLogo },
];
