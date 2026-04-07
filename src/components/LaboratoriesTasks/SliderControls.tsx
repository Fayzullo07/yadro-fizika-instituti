interface SliderControlsProps {
  total: number;
  currentIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const SliderControls: React.FC<SliderControlsProps> = ({
  total,
  currentIndex,
  onSelect,
  onPrev,
  onNext,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <span className="text-white/40 text-xs font-mono">
        {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <div className="hidden sm:flex gap-1">
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/20 hover:bg-white/40 w-1.5'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>

    <div className="flex gap-2">
      <ArrowButton direction="prev" onClick={onPrev} />
      <ArrowButton direction="next" onClick={onNext} />
    </div>
  </div>
);

const ArrowButton: React.FC<{ direction: 'prev' | 'next'; onClick: () => void }> = ({
  direction,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all ${
      direction === 'prev'
        ? 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'
        : 'bg-white/20 text-white hover:bg-white/30'
    }`}
    aria-label={direction === 'prev' ? 'Previous' : 'Next'}
  >
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  </button>
);

export default SliderControls;
