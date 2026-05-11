import { PARTNERS } from './PartnersData';
import PartnerItem from './PartnerItem';
import { usePartners } from '@/hooks/usePartners';
import type { Partner } from './PartnersData';

const PartnersMarquee: React.FC = () => {
  const { data } = usePartners();

  const apiPartners: Partner[] = (data?.data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    link: p.link,
  }));

  const partners = apiPartners.length > 0 ? apiPartners : PARTNERS;

  return (
    <section className="py-10 bg-gray-50 border-y border-gray-100">
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-gray-50 to-transparent z-10"></div>

        <div className="flex animate-marquee">
          {partners.map((partner) => (
            <PartnerItem key={partner.id} partner={partner} />
          ))}
          {partners.map((partner) => (
            <PartnerItem key={`dup-${partner.id}`} partner={partner} />
          ))}
          {partners.map((partner) => (
            <PartnerItem key={`dup-${partner.id}`} partner={partner} />
          ))}
          {partners.map((partner) => (
            <PartnerItem key={`dup-${partner.id}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
