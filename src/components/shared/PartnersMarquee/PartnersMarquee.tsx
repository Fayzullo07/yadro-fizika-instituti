import { PARTNERS } from './PartnersData';
import PartnerItem from './PartnerItem';

const PartnersMarquee: React.FC = () => (
  <section className="py-10 bg-gray-50 border-y border-gray-100">
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-gray-50 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-gray-50 to-transparent z-10"></div>

      <div className="flex animate-marquee">
        {PARTNERS.map((partner) => (
          <PartnerItem key={partner.id} partner={partner} />
        ))}
        {PARTNERS.map((partner) => (
          <PartnerItem key={`dup-${partner.id}`} partner={partner} />
        ))}
      </div>
    </div>
  </section>
);

export default PartnersMarquee;
