import { useScientificActivity } from '@/hooks/useDepartment';
import { sanitizeHtmlRich } from '@/utils/htmlUtils';

const ScienceTab: React.FC<{ laboratoryId: number }> = ({ laboratoryId }) => {
  const { data, loading, error } = useScientificActivity(laboratoryId);

  const content = data?.data?.content;

  return (
    <div
      className={`transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
    >
      {error && <p className="text-center py-16 text-gray-500">Xatolik yuz berdi</p>}
      {!error && !content && !loading && (
        <p className="text-center py-16 text-gray-400">Ma'lumot mavjud emas</p>
      )}
      {content && (
        <div
          className="bg-white shadow-sm p-6 max-w-none overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlRich(content) }}
        />
      )}
    </div>
  );
};

export default ScienceTab;
