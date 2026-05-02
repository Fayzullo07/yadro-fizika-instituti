import uzStructureImage from '@/assets/pdf/struktura_page1uzb.jpg';
import enStructureImage from '@/assets/pdf/struktura_page2eng.jpg';
import ruStructureImage from '@/assets/pdf/struktura_page3rus.jpg';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types';

interface StructureDoc {
  title: string;
  file: string;
}

const Structure: React.FC = () => {
  const { t, language } = useLanguage();
  const structureDocsByLanguage: Record<Language, StructureDoc> = {
    uz: {
      title: "O'zbek tili",
      file: uzStructureImage,
    },
    ru: {
      title: 'Rus tili',
      file: ruStructureImage,
    },
    en: {
      title: 'English',
      file: enStructureImage,
    },
  };
  const currentDoc = structureDocsByLanguage[language] || structureDocsByLanguage.uz;

  return (
    <div className="min-h-screen">
      <PageTitle>{t('nav.institute.services')}</PageTitle>
      <article>
        <img
          src={currentDoc.file}
          alt={`Institut tuzilmasi ${currentDoc.title}`}
          loading="lazy"
          className="w-full h-auto"
        />
      </article>
    </div>
  );
};

export default Structure;
