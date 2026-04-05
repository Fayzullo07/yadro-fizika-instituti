interface VerticalSlideSelectorProps {
  total: number;
  currentIndex: number;
  onSelect: (index: number) => void;
}

const VerticalSlideSelector: React.FC<VerticalSlideSelectorProps> = ({
  total,
  currentIndex,
  onSelect,
}) => (
  <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-6">
    {Array.from({ length: total }, (_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        className="group relative flex items-center gap-3"
        aria-label={`Slide ${index + 1}`}
      >
        <span
          className={`text-xs font-mono transition-all duration-300 ${
            index === currentIndex
              ? 'text-white opacity-100'
              : 'text-white/0 group-hover:text-white/60 opacity-0 group-hover:opacity-100'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative w-0.5 h-10 bg-white/20 rounded-full overflow-hidden">
          {index === currentIndex ? (
            <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full animate-progress"></div>
          ) : (
            <div className="absolute inset-0 w-full bg-white/0 group-hover:bg-white/40 rounded-full transition-colors duration-300"></div>
          )}
        </div>
      </button>
    ))}
  </div>
);

export default VerticalSlideSelector;
