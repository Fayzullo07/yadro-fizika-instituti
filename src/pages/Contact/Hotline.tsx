import React from 'react';
import { useGeneral } from '@/hooks/useGeneral';
import { useLanguage } from '@/contexts/LanguageContext';
import { sanitizeHtml } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

interface SocialMediaLink {
  name: string;
  url: string;
}

interface ContactRow {
  label: string;
  type: 'phone' | 'email' | 'link' | 'text' | 'description' | 'map' | 'social';
  value: string | React.ReactNode | SocialMediaLink[];
}

const Hotline: React.FC = () => {
  const { t } = useLanguage();
  const { data: generalData, loading } = useGeneral();

  if (loading) return <Loading />;

  const phone = generalData?.phone || '+99871 203-32-23 (700)';
  const hotline = generalData?.hotline || '+99871 203-32-31';
  const website = generalData?.website || 'www.naris.uz';
  const email = generalData?.email || 'info@ilmiy.uz';
  const address =
    generalData?.address || '100174, Toshkent sh., Olmazor tumani, Universitet ko‘chasi, 7 uy';
  const organizationDesc = generalData?.organization_desc || null;

  const socialMediaLinks: SocialMediaLink[] = generalData?.social_media || [
    { name: 'youtube', url: '#' },
    { name: 'telegram', url: '#' },
    { name: 'instagram', url: '#' },
    { name: 'facebook', url: '#' },
  ];

  const contactRows: ContactRow[] = [
    { label: 'Telefon', type: 'phone', value: phone },
    { label: 'Ishonch telefoni', type: 'phone', value: hotline },
    { label: 'Veb-sayt', type: 'link', value: website },
    { label: 'Elektron pochta', type: 'email', value: email },
    { label: 'Ijtimoiy tarmoqlar', type: 'social', value: socialMediaLinks },
    { label: 'Manzil', type: 'description', value: organizationDesc || address },
    {
      label: 'Transport',
      type: 'text',
      value:
        '"Universam" metro bekati 6a, 7, 24, 50, 51, 63, 71, 93, 97, 123, 124, 142, 169, 175, 470 yo‘nalishli avtobuslar',
    },
    {
      label: 'Ish vaqti',
      type: 'text',
      value: 'Dushanba – Juma, soat 9:00 dan 18:00 gacha',
    },
    {
      label: 'Yo‘l xaritasi',
      type: 'map',
      value: (
        <iframe
          src="https://yandex.com/map-widget/v1/?ll=69.287714,41.364664&z=16&pt=69.287714,41.364664,pm2rdm"
          width="100%"
          height="300"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-md"
          title="Manzil xaritasi"
        />
      ),
    },
  ];

  const getSocialIcon = (name: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      youtube: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
      telegram: (
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.56 8.16-1.27 8.45c-.15.84-.44 1.12-.73 1.15-.61.05-1.07-.4-1.66-.79l-2.33-1.6c-1.03-.66-.36-1.01.22-1.6l2.9-2.83c.01-.02.01-.13-.05-.19-.06-.06-.15-.04-.21-.02-.09.02-1.51.96-4.26 2.82-.4.27-.77.4-1.1.39-.36-.01-.99-.19-1.48-.35-.6-.19-1.07-.29-1.03-.62.02-.17.13-.34.36-.52 1.38-1.08 3.31-2.59 4.4-3.48 1.98-1.68 3.74-2.54 4.18-2.37.09.03.16.11.2.22.04.11.05.23.03.35z" />
      ),
      instagram: (
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.26-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.64-.07 4.85-.07z" />
      ),
      facebook: (
        <path d="M24 12c0-6.63-5.37-12-12-12S0 5.37 0 12c0 6 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95H15.83c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 22.95 24 18 24 12z" />
      ),
    };
    return icons[name];
  };

  return (
    <div className="py-4">
      <PageTitle>Ishonch telefoni</PageTitle>

      <div className="border border-[#e9ecef] overflow-hidden">
        <table className="w-full">
          <tbody>
            {contactRows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-[#e9ecef] last:border-b-0 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}`}
              >
                <td className="w-1/3 px-6 py-4 font-semibold align-top text-gray-800">
                  {row.label}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {row.type === 'phone' && (
                    <a
                      href={`tel:${(row.value as string).replace(/\s/g, '')}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {row.value as string}
                    </a>
                  )}
                  {row.type === 'email' && (
                    <a
                      href={`mailto:${row.value as string}`}
                      className="text-blue-600 hover:text-blue-800 underline transition-colors"
                    >
                      {row.value as string}
                    </a>
                  )}
                  {row.type === 'link' && (
                    <a
                      href={row.value as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline transition-colors"
                    >
                      {row.value as string}
                    </a>
                  )}
                  {row.type === 'text' && (
                    <span className="text-gray-700">{row.value as string}</span>
                  )}
                  {row.type === 'description' && (
                    <div
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(
                          organizationDesc ? organizationDesc : (row.value as string)
                        ),
                      }}
                    />
                  )}
                  {row.type === 'map' && (
                    <div className="w-full">{row.value as React.ReactNode}</div>
                  )}
                  {row.type === 'social' && (
                    <div className="flex gap-3">
                      {(row.value as SocialMediaLink[]).map((s, idx) => {
                        const iconColors: Record<string, string> = {
                          youtube: 'bg-red-600 hover:bg-red-700',
                          telegram: 'bg-blue-500 hover:bg-blue-600',
                          instagram:
                            'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
                          facebook: 'bg-blue-600 hover:bg-blue-700',
                        };
                        const iconClass =
                          iconColors[s.name?.toLowerCase()] || 'bg-blue-600 hover:bg-blue-700';
                        return (
                          <a
                            key={idx}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 rounded-full ${iconClass} flex items-center justify-center transition-colors`}
                            title={s.name || ''}
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              {getSocialIcon(s.name)}
                            </svg>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hotline;
