interface OrganizationBadgeProps {
  name: string;
  logo?: string;
  slideKey: number;
}

const OrganizationBadge: React.FC<OrganizationBadgeProps> = ({ name, logo, slideKey }) => (
  <div
    key={`badge-${slideKey}`}
    className="animate-slide-up inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-2.5 mb-8"
  >
    {logo && <img src={logo} alt="" className="h-6 w-6 object-contain" />}
    <span className="text-white/80 text-sm font-medium">{name}</span>
  </div>
);

export default OrganizationBadge;
