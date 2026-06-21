import { academicLinksConfig, type AcademicLinkKey } from './academicLinksConfig';

interface AcademicLinksRowProps {
  data: Partial<Record<AcademicLinkKey, string | null | undefined>>;
  className?: string;
}

export const AcademicLinksRow: React.FC<AcademicLinksRowProps> = ({ data, className = '' }) => {
  const links = academicLinksConfig.filter((l) => data[l.key]);

  if (links.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.map(({ key, label, color, bg, logo }) => (
        <a
          key={key}
          href={data[key] as string}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
          style={{ borderColor: color, color, background: bg }}
        >
          <img src={logo} alt="" className="w-3.5 h-3.5 object-contain rounded-sm" />
          {label}
        </a>
      ))}
    </div>
  );
};
