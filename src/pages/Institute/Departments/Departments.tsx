import { useLanguage } from '@/contexts/LanguageContext';
import { useDepartments } from '@/hooks/useDepartment';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Loading from '@/components/shared/Loading/Loading';

const Departments: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useDepartments();

  const departments = data?.data ?? [];

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen">
      <PageTitle>{t('nav.institute.departments') || "Bo'limlar"}</PageTitle>

      {error && <p className="text-center text-red-600 py-8">{t('common.error')}</p>}

      {!error && departments.length === 0 && (
        <p className="text-center text-gray-500 py-8">{t('pages.departments.empty')}</p>
      )}

      {departments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#013d8c] hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#013d8c]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#013d8c] transition-colors leading-snug">
                    {dept.name}
                  </h3>
                  {dept.type && (
                    <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full capitalize">
                      {dept.type}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Departments;
