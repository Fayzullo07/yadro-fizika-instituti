import logo from '@/assets/logo/logo_70_trimmed.png';

const Loading: React.FC = () => (
  <div className="flex min-h-[50vh] w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <img src={logo} alt="Logo" className="h-10 w-auto object-contain animate-pulse" />
        <div className="absolute inset-0 border-2 border-[var(--color-neutral-100)] border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);

export default Loading;
