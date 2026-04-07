const HeroSkeleton: React.FC = () => (
  <div className="relative h-[calc(100vh-120px)] overflow-hidden bg-gray-100">
    {/* White card skeleton */}
    <div className="absolute inset-y-0 left-0 z-10 flex items-center">
      <div className="bg-white p-8 md:p-12 lg:p-16 w-[90vw] md:w-[50vw] lg:w-[40vw] min-h-[50%] flex flex-col justify-center space-y-6">
        {/* Slide counter */}
        <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>

        {/* Title */}
        <div className="space-y-3">
          <div className="h-10 md:h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>
          <div className="h-10 md:h-12 bg-gray-200 rounded-lg w-3/5 animate-pulse"></div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-4/5 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSkeleton;
