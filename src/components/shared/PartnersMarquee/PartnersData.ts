import prezyidentImage from '@/assets/77200eb7-47ca-e586-f031-19d1a952f3f0_menu-links_487.webp';
import oliymajlisImage from '@/assets/bb.webp';
import hukumatImage from '@/assets/cc.webp';
import portalImage from '@/assets/dd.webp';
import milliyhukquqiImage from '@/assets/ee.webp';

export interface Partner {
  id: number;
  name: string;
  subtitle?: string;
  image: string;
  link: string;
}

export const PARTNERS: Partner[] = [
  {
    id: 1,
    name: "O'ZBEKISTON RESPUBLIKASI PREZIDENTI",
    subtitle: 'MATBUOT XIZMATI',
    image: prezyidentImage,
    link: 'https://www.president.uz/uz',
  },
  {
    id: 2,
    name: "O'ZBEKISTON RESPUBLIKASI OLIY",
    subtitle: 'MAJLISI QONUNCHILIK PALATASI',
    image: oliymajlisImage,
    link: 'https://parliament.gov.uz/',
  },
  {
    id: 3,
    name: "O'ZBEKISTON RESPUBLIKASI OLIY",
    subtitle: 'MAJLISINING SENATI',
    image: hukumatImage,
    link: 'https://senat.gov.uz/',
  },
  {
    id: 4,
    name: "O'ZBEKISTON RESPUBLIKASI HUKUMATI",
    subtitle: 'PORTALI',
    image: portalImage,
    link: 'https://gov.uz/uz',
  },
  {
    id: 5,
    name: 'MILLIY HUQUQIY',
    subtitle: 'INTERNET PORTALI',
    image: milliyhukquqiImage,
    link: 'https://huquqiyportal.uz/',
  },
];
