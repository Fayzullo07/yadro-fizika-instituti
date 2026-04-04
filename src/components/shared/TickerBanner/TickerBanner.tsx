import React from 'react';
import { useBanners } from '@/hooks/useBanners';
import { stripHtmlRegex } from '@/utils/htmlUtils';

const TickerBanner: React.FC = () => {
  const { data, loading } = useBanners({ per_page: 5 });
  const banners = data?.results || [];

  if (loading || !banners.length) {
    return null;
  }

  // Combine all banner titles into one scrolling text
  const tickerText = banners
    .map((banner: { title?: string }) => stripHtmlRegex(banner.title || ''))
    .filter(Boolean)
    .join(' • ');

  if (tickerText) {
    return (
      <div className="bg-[#013d8c] text-white py-2 my-3 mb-6 overflow-hidden relative group cursor-pointer">
        <div className="flex items-center">
          <div className="animate-scroll whitespace-nowrap flex items-center">
            <span className="px-4 font-medium text-sm">
              Ўзбекистон–Эрон” халқаро қўшма танлови Муддат: 03.02.2026 | АҚШда стажировка ўтинг
              Муддат: 16.02.2026 | Султан Идрис университетида стажировка ўтинг Муддат: 16.02.2026
              Ўзбекистон – 2030” стратегияси муҳокамасида иштирок этинг! Семинарда иштирок этинг!
              Россия Федерациясида стажировка ўтинг Муддат: 16.02.2026 | Қозон Федерал
              университетида стажировка ўтинг Муддат: 16.02.2026 | Женева халқаро институтида
              стажировка ўтинг Муддат: 16.02.2026 Иннополисда стажировка ўтинг Муддат: 16.02.2026 |
              AREEO стажировкаси Муддат: 16.02.2026
            </span>
            <span className="px-4 font-medium text-sm">
              Ўзбекистон–Эрон” халқаро қўшма танлови Муддат: 03.02.2026 | АҚШда стажировка ўтинг
              Муддат: 16.02.2026 | Султан Идрис университетида стажировка ўтинг Муддат: 16.02.2026
              Ўзбекистон – 2030” стратегияси муҳокамасида иштирок этинг! Семинарда иштирок этинг!
              Россия Федерациясида стажировка ўтинг Муддат: 16.02.2026 | Қозон Федерал
              университетида стажировка ўтинг Муддат: 16.02.2026 | Женева халқаро институтида
              стажировка ўтинг Муддат: 16.02.2026 Иннополисда стажировка ўтинг Муддат: 16.02.2026 |
              AREEO стажировкаси Муддат: 16.02.2026
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="!bg-[#013d8c] text-white py-4 overflow-hidden relative group cursor-pointer">
      <div className="flex items-center">
        <div className="animate-scroll whitespace-nowrap flex items-center">
          <span className="px-4 font-medium text-sm">{tickerText}</span>
          <span className="px-4 font-medium text-sm">{tickerText}</span>
        </div>
      </div>
    </div>
  );
};

export default TickerBanner;
