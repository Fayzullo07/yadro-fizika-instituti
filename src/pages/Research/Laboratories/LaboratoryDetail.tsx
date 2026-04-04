import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLaboratory } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import BackButton from '@/components/shared/BackButton/BackButton';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';
import { useState } from 'react';
import type { Language } from '@/types';

// Rasmlarni til bo'yicha import qilish
import uzImg1 from '@/assets/pdf/laboratoriya/Суний интелект Узб-1.jpg';
import uzImg2 from '@/assets/pdf/laboratoriya/Суний интелект Узб-2.jpg';
import enImg1 from '@/assets/pdf/laboratoriya/Сунний интелект Англ-1.jpg';
import enImg2 from '@/assets/pdf/laboratoriya/Сунний интелект Англ-2.jpg';
import ruImg1 from '@/assets/pdf/laboratoriya/Сунний интелект Рус-1.jpg';
import ruImg2 from '@/assets/pdf/laboratoriya/Сунний интелект Рус-2.jpg';

interface LaboratoryInfo {
  id: number | string;
  name: string;
}

interface ImageModalProps {
  src: string;
  onClose: () => void;
}

interface ImagesViewProps {
  laboratory: LaboratoryInfo;
  t: (key: string) => string;
  showImages: boolean;
  images: string[];
}

const LANG_IMAGES: Record<Language, string[]> = {
  uz: [uzImg1, uzImg2],
  en: [enImg1, enImg2],
  ru: [ruImg1, ruImg2],
};

const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={onClose}
        className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img
        src={src}
        alt="Laboratoriya rasmi"
        className="w-full max-h-[90vh] object-contain"
      />
    </div>
  </div>
);

const LaboratoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: laboratoryData, loading, error } = useLaboratory();

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          {t('common.error') || 'Xatolik yuz berdi'}
        </div>
      </div>
    );
  }

  const defaultLaboratories: LaboratoryInfo[] = [
    { id: 'default-1', name: "Bino va inshootlarning zilzilabardoshligi laboratoriyasi" },
    { id: 'default-2', name: "Sun'iy intellekt texnologiyalari va raqamli qurilishni rivojlantirish laboratoriyasi" },
    { id: 'default-3', name: "Geotexnika, gruntlar mexanikasi va qurilish materiallari laboratoriyasi" },
    { id: 'default-4', name: "Barqaror konstruktiv yechimlar, shaharsozlik va infratuzilma laboratoriyasi" },
    { id: 'default-5', name: "\"Yashil\" qurilish, energiya samarador va muqobil texnologiyalar laboratoriyasi" },
    { id: 'default-6', name: "Zilzilabardoshlik bo'yicha ekspertlar guruhi (shartnomalarga muvofiq jalb qilinadi)" },
  ];

  const allLaboratories: LaboratoryInfo[] = laboratoryData?.results || [];
  const laboratory: LaboratoryInfo =
    allLaboratories.find((lab) => lab.id === parseInt(id || '0')) ||
    defaultLaboratories.find((lab) => lab.id === id) ||
    defaultLaboratories[parseInt(id || '1') - 1] ||
    defaultLaboratories[0];

  const numericId: number = parseInt(id || '0');
  const showImages = numericId === 1 || id === 'default-1' || id === '1';
  const images = LANG_IMAGES[language] || LANG_IMAGES['uz'];

  return (
    <ImagesView
      laboratory={laboratory}
      t={t}
      showImages={showImages}
      images={images}
    />
  );
};

const ImagesView: React.FC<ImagesViewProps> = ({ laboratory, t, showImages, images }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* <BackButton  /> */}
            <BackButton
                            to="/tadqiqot/laboratories"
                            label={t('') || 'Laboratoriyalar ro\'yxatiga qaytish'}
                        />
        <div className="!mt-4">
          <SectionHeader
            title={laboratory?.name || 'Laboratoriya'}
            subtitle={t('pages.laboratories.detail') || 'Laboratoriya ma\'lumotlari'}
          />
        </div>

        {showImages && (
          <div className="max-w-5xl mx-auto mt-8 flex flex-col gap-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className=" overflow-hidden"
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img}
                  alt={`Laboratoriya rasmi ${idx + 1}`}
                  className="w-full object-contain"
                />
              </div>
            ))}
          </div>
        )}

        {selectedImg && (
          <ImageModal src={selectedImg} onClose={() => setSelectedImg(null)} />
        )}
      </div>
    </div>
  );
};

export default LaboratoryDetail;
