import logo from '@/assets/logo1.png.png';

const Loading: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center h-screen bg-white z-50">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <img src={logo} alt="Logo" className="h-16 w-16 object-contain animate-pulse" />
        <div className="absolute inset-0 h-16 w-16 border-2 border-gray-200 border-t-(--primary-blue) rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);

export default Loading;
