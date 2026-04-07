import type { Partner } from './PartnersData';

const PartnerItem: React.FC<{ partner: Partner }> = ({ partner }) => (
  <a
    href={partner.link}
    target="_blank"
    rel="noopener noreferrer"
    className="shrink-0 mx-5 md:mx-10 flex items-center gap-3 md:gap-4 group cursor-pointer"
  >
    <div
      className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md"
      style={{ transition: 'box-shadow 0.5s ease' }}
    >
      <img
        src={partner.image}
        alt={partner.name}
        loading="lazy"
        className="w-10 h-10 md:w-14 md:h-14 object-contain"
      />
    </div>
    <div>
      <p
        className="text-gray-700 group-hover:text-gray-900 font-semibold text-xs leading-tight whitespace-nowrap"
        style={{ transition: 'color 0.5s ease' }}
      >
        {partner.name}
      </p>
      {partner.subtitle && (
        <p
          className="text-gray-400 group-hover:text-gray-600 font-medium text-xs leading-tight whitespace-nowrap"
          style={{ transition: 'color 0.5s ease' }}
        >
          {partner.subtitle}
        </p>
      )}
    </div>
  </a>
);

export default PartnerItem;
