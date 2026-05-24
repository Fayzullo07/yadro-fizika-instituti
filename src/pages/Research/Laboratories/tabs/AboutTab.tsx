import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { sanitizeHtmlRich } from '@/utils/htmlUtils';
import { useLaboratoryDirector } from '@/hooks/useDepartment';
import type { LaboratoryItem, LaboratoryDirector } from '@/types';

const academicLinks: { key: keyof LaboratoryDirector; label: string; color: string; bg: string }[] =
  [
    { key: 'google_scholar', label: 'Google Scholar', color: '#4285F4', bg: '#EAF1FB' },
    { key: 'web_of_science', label: 'Web of Science', color: '#CC0000', bg: '#FDEAEA' },
    { key: 'scopus', label: 'Scopus', color: '#E9711C', bg: '#FEF0E6' },
    { key: 'researchgate', label: 'ResearchGate', color: '#00CCBB', bg: '#E6FAF8' },
    { key: 'orcid', label: 'ORCID', color: '#A6CE39', bg: '#F4FAE6' },
  ];

const AboutTab: React.FC<{ lab: LaboratoryItem }> = ({ lab }) => {
  const { data: directorData } = useLaboratoryDirector(lab.id);
  const director = directorData?.data;

  if (!lab.content && !lab.images?.length && !director)
    return <p className="text-center py-16 text-gray-400">Kontent mavjud emas</p>;

  return (
    <div className="bg-white shadow-sm">
      {/* Director card */}
      {director && (
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#013d8c] mb-4">Laboratoriya mudiri</h2>
          <div className="border border-gray-200 flex flex-col sm:flex-row overflow-hidden">
            {/* Photo */}
            <div className="shrink-0" style={{ inlineSize: 220, blockSize: 260 }}>
              {director.image ? (
                <Image
                  src={director.image}
                  alt={director.full_name}
                  style={{
                    inlineSize: 220,
                    blockSize: 260,
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-50">
                  <svg className="w-16 h-16 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
              )}
            </div>
            {/* Info */}
            <div className="flex flex-1 flex-col sm:flex-row p-6 gap-8">
              <div className="flex flex-col gap-3 flex-1">
                <p className="font-bold text-gray-900 text-lg leading-snug">{director.full_name}</p>
                {director.degree && director.degree !== "Yo'q" && (
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-0.5">Ilmiy darajasi:</p>
                    <p className="text-sm text-gray-600">{director.degree}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">Lavozimi:</p>
                  <p className="text-sm text-gray-600">{director.position}</p>
                </div>
                {academicLinks.filter((l) => director[l.key]).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {academicLinks
                      .filter((l) => director[l.key])
                      .map((l) => (
                        <a
                          key={l.key}
                          href={director[l.key] as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                          style={{ borderColor: l.color, color: l.color, background: l.bg }}
                        >
                          {l.label}
                        </a>
                      ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:min-w-40 sm:items-start">
                <Link
                  to={`/research/laboratories/${lab.id}/staff/${director.id}`}
                  className="mt-auto inline-block border border-amber-400 text-amber-600 hover:bg-amber-50 transition-colors px-6 py-2 text-sm text-center cursor-pointer"
                >
                  Batafsil
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {lab.content && (
        <div
          className="p-6 w-full max-w-none [&_table]:w-full [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlRich(lab.content) }}
        />
      )}

      {/* Images gallery */}
      {lab.images && lab.images.length > 0 && (
        <div className="p-6 pt-0">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-base font-semibold text-[#013d8c] tracking-wide uppercase">
              Rasmlar
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-[#013d8c33] to-transparent" />
          </div>
          <Image.PreviewGroup>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {lab.images.map((img) => (
                <div
                  key={img.id}
                  className="relative overflow-hidden rounded-lg shadow-sm"
                  style={{ blockSize: 160 }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${img.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(12px)',
                      transform: 'scale(1.1)',
                    }}
                  />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <Image
                      src={img.url}
                      alt=""
                      style={{ maxBlockSize: 160, maxInlineSize: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
      )}
    </div>
  );
};

export default AboutTab;
