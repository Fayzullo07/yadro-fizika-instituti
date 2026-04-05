interface MobileDotsProps {
  total: number;
  currentIndex: number;
  onSelect: (index: number) => void;
}

const MobileDots: React.FC<MobileDotsProps> = ({ total, currentIndex, onSelect }) => (
  <div className="absolute bottom-28 left-0 right-0 z-20 lg:hidden">
    <div className="container mx-auto flex items-center gap-4">
      <span className="text-white/40 text-xs font-mono">
        {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/30 w-4'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
);

export default MobileDots;
