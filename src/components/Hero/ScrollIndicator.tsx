const ScrollIndicator: React.FC = () => (
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
    <div className="w-5 h-8 rounded-full border-2 border-black/40 flex items-start justify-center p-1">
      <div className="w-1 h-2 rounded-full bg-black/60 animate-bounce"></div>
    </div>
  </div>
);

export default ScrollIndicator;
