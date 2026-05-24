import { useInternationalCollaboration } from '@/hooks/useDepartment';
import { sanitizeHtmlRich } from '@/utils/htmlUtils';

const InternationalTab: React.FC<{ laboratoryId: number }> = ({ laboratoryId }) => {
  const { data, loading, error } = useInternationalCollaboration(laboratoryId);

  const details = data?.data?.details;

  return (
    <div
      className={`transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
    >
      {error && <p className="text-center py-16 text-gray-500">Xatolik yuz berdi</p>}
      {!error && !details && !loading && (
        <p className="text-center py-16 text-gray-400">Ma'lumot mavjud emas</p>
      )}
      {details && (
        <div
          className="bg-white shadow-sm p-6 max-w-none overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlRich(details) }}
        />
      )}
    </div>
  );
};

export default InternationalTab;
