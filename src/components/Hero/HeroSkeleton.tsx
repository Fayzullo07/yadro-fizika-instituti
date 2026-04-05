const HeroSkeleton: React.FC = () => (
  <div className="relative h-screen overflow-hidden flex items-center bg-gray-100">
    <div className="relative z-10 w-full">
      <div className="container mx-auto">
        <div className="max-w-3xl space-y-6">
          {/* Organization badge */}
          <div className="h-8 bg-gray-200 rounded-full w-48 animate-pulse"></div>

          {/* Title */}
          <div className="space-y-3">
            <div className="h-12 md:h-16 bg-gray-200 rounded-lg w-full animate-pulse"></div>
            <div className="h-12 md:h-16 bg-gray-200 rounded-lg w-3/5 animate-pulse"></div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-full max-w-xl animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-4/5 max-w-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSkeleton;
