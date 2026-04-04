const FooterSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
      <div className="h-5 bg-white/10 rounded-lg w-40"></div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-white/10 rounded w-full"></div>
      <div className="h-3 bg-white/10 rounded w-4/5"></div>
      <div className="h-3 bg-white/10 rounded w-3/5"></div>
    </div>
  </div>
);

export default FooterSkeleton;
