import { usePartners } from '@/hooks/usePartners';
import { useLanguage } from '@/contexts/LanguageContext';
import PartnerItem from './PartnerItem';

const SkeletonItem: React.FC = () => (
  <div className="shrink-0 mx-5 md:mx-10 flex items-center gap-3 md:gap-4">
    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gray-200 animate-pulse" />
    <div className="flex flex-col gap-2">
      <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
      <div className="w-16 h-2.5 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
);

const TITLE: Record<string, string> = {
  uz: 'Rasmiy hamkorlar',
  ru: 'Официальные партнёры',
  en: 'Official Partners',
};

const PartnersMarquee: React.FC = () => {
  const { data, loading } = usePartners();
  const { language } = useLanguage();

  const partners = (data?.data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    link: p.link,
  }));

  if (!loading && !partners.length) return null;

  return (
    <section className="py-10 bg-gray-50 border-y border-gray-100">
      <div className="text-center mb-6">
        <p className="text-base font-semibold text-gray-400 uppercase tracking-widest mb-1">
          {TITLE[language] ?? TITLE.uz}
        </p>
        <div className="w-10 h-0.5 bg-[#013d8c] mx-auto rounded-full" />
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-gray-50 to-transparent z-10" />

        {loading ? (
          <div className="flex">
            {[...Array(6)].map((_, i) => (
              <SkeletonItem key={i} />
            ))}
          </div>
        ) : (
          <div className="flex animate-marquee">
            {[...Array(4)].flatMap((_, i) =>
              partners.map((partner) => (
                <PartnerItem key={`${i}-${partner.id}`} partner={partner} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersMarquee;
