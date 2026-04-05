import { Link } from 'react-router-dom';
import type { Feature } from './FeaturesData';

const ArrowIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

interface FeatureCardProps {
  feature: Feature;
  readMoreText: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, readMoreText }) => (
  <Link
    to={feature.link}
    className="group relative flex flex-col p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-gray-200 hover:bg-gray-50"
    style={{ transition: 'background-color 0.5s ease' }}
  >
    {/* Number */}
    <span
      className="text-5xl font-bold text-gray-100 group-hover:text-gray-200 absolute top-6 right-8"
      style={{ transition: 'color 0.5s ease' }}
    >
      {feature.number}
    </span>

    {/* Icon */}
    <div
      className="w-12 h-12 rounded-full bg-gray-900 group-hover:bg-blue-600 flex items-center justify-center text-white mb-6"
      style={{ transition: 'background-color 0.5s ease' }}
    >
      {feature.icon}
    </div>

    {/* Title */}
    <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-wide">{feature.title}</h3>

    {/* Description */}
    <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>

    {/* Spacer */}
    <div className="flex-1"></div>

    {/* Arrow */}
    <div
      className="flex items-center gap-2 text-gray-400 group-hover:text-gray-900 mt-8"
      style={{ transition: 'color 0.5s ease' }}
    >
      <span className="text-sm font-medium">{readMoreText}</span>
      <div className="group-hover:translate-x-1" style={{ transition: 'transform 0.5s ease' }}>
        <ArrowIcon />
      </div>
    </div>
  </Link>
);

export default FeatureCard;
