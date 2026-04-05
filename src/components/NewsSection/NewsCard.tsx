import { Link } from 'react-router-dom';
import { stripHtmlRegex, sanitizeHtml } from '@/utils/htmlUtils';
import type { NewsItem } from '@/types';

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => (
  <Link
    to={`/news/${item.id}`}
    className="group relative block aspect-4/3 overflow-hidden bg-gray-200"
  >
    {/* Image */}
    {item.images?.[0] ? (
      <img
        src={item.images[0].image}
        alt={stripHtmlRegex(item.title)}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover news-card-img"
      />
    ) : (
      <div className="absolute inset-0 bg-gray-300"></div>
    )}

    {/* Dark gradient */}
    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

    {/* Content on image */}
    <div className="absolute inset-0 flex flex-col justify-between p-5">
      {/* Top — Batafsil */}
      <div className="flex justify-end">
        <div className="flex items-center gap-1.5 text-white news-card-arrow">
          <span className="text-xs font-medium">Batafsil</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>

      {/* Bottom — date + title */}
      <div>
        {item.created_at && (
          <span className="inline-block text-white/40 group-hover:text-white/60 text-xs font-medium tracking-wide mb-2.5">
            {item.created_at}
          </span>
        )}

        {item.title && (
          <h4
            className="text-white/90 group-hover:text-white text-sm font-semibold leading-snug line-clamp-2 min-h-10 **:text-sm! **:font-semibold! **:leading-snug!"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
          />
        )}
      </div>
    </div>
  </Link>
);

export default NewsCard;
