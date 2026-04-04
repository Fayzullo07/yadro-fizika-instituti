import { useState } from 'react';
import { useVacancies, useCreateApplication } from '@/hooks/useApplications';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';
import { sanitizeHtml } from '@/utils/htmlUtils';
import type { Vacancy } from '@/types';

interface VacancyFormData {
  fullname: string;
  email: string;
  phone: string;
  comment: string;
}

const Vacancies: React.FC = () => {
  const { t } = useLanguage();
  const { data: vacanciesData, loading, error } = useVacancies();
  const { mutate: createApplication, loading: submitting } = useCreateApplication();

  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<VacancyFormData>({
    fullname: '',
    email: '',
    phone: '',
    comment: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const vacancies: Vacancy[] = vacanciesData?.results || [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    setResumeFile(file || null);
    setFormError(null);
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^\+?[\d\s\-()]{9,15}$/.test(phone);
  };

  const MAX_FILE_SIZE_MB = 5;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    if (!formData.fullname || !formData.email || !formData.phone || !selectedVacancy) {
      setFormError(t('vacancies.fillAllFields') || "Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormError(t('vacancies.invalidEmail') || "Email manzil noto'g'ri formatda");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setFormError(t('vacancies.invalidPhone') || "Telefon raqam noto'g'ri formatda");
      return;
    }

    if (resumeFile && resumeFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFormError(
        t('vacancies.fileTooLarge') || `Fayl hajmi ${MAX_FILE_SIZE_MB}MB dan oshmasligi kerak`
      );
      return;
    }

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('vacancy', String(selectedVacancy.id));
      if (formData.comment) {
        formDataToSend.append('comment', formData.comment);
      }
      if (resumeFile) {
        formDataToSend.append('resume', resumeFile);
      }

      await createApplication(formDataToSend);

      setFormSuccess(true);
      setFormData({
        fullname: '',
        email: '',
        phone: '',
        comment: '',
      });
      setResumeFile(null);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = '';
      }

      setTimeout(() => {
        setShowModal(false);
        setSelectedVacancy(null);
        setFormSuccess(false);
      }, 2000);
    } catch (err: unknown) {
      setFormError((err as Error).message || t('common.error') || 'Xatolik yuz berdi');
    }
  };

  const openApplicationModal = (vacancy: Vacancy): void => {
    setSelectedVacancy(vacancy);
    setShowModal(true);
    setFormError(null);
    setFormSuccess(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{t('common.error') || 'Xatolik yuz berdi'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <SectionHeader
          title={t('nav.ochiq.vacancies') || 'Vakansiyalar'}
          subtitle={t('vacancies.subtitle') || "Mavjud vakansiyalar va ish o'rinlari"}
        />

        {vacancies.length > 0 ? (
          <div className="space-y-4">
            {vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="border border-gray-300 rounded p-6 hover:border-gray-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {vacancy.name && (
                      <h3
                        className="text-lg font-semibold text-gray-900 mb-2"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(vacancy.name) }}
                      />
                    )}

                    {vacancy.desc && (
                      <div
                        className="text-gray-700 mb-3"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(vacancy.desc) }}
                      />
                    )}

                    {vacancy.created_at && (
                      <p className="text-sm text-gray-500">{vacancy.created_at}</p>
                    )}
                  </div>

                  <button
                    onClick={() => openApplicationModal(vacancy)}
                    className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    {t('vacancies.apply') || 'Ariza yuborish'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>{t('vacancies.noVacancies') || 'Hozirda vakansiyalar mavjud emas'}</p>
          </div>
        )}

        {/* Application Modal */}
        {showModal && selectedVacancy && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded border border-gray-300 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t('vacancies.applyFor') || 'Ariza yuborish'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedVacancy(null);
                      setFormError(null);
                      setFormSuccess(false);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {selectedVacancy.name && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">
                      {t('vacancies.vacancy') || 'Vakansiya'}:
                    </p>
                    <div
                      className="text-gray-900 font-medium"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedVacancy.name) }}
                    />
                  </div>
                )}

                {formSuccess ? (
                  <div className="text-center py-8">
                    <p className="text-base text-gray-700 mb-2">
                      {t('vacancies.success') || 'Arizangiz muvaffaqiyatli yuborildi!'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('vacancies.fullname') || "To'liq ism"} *
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('vacancies.email') || 'Email'} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('vacancies.phone') || 'Telefon'} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('vacancies.comment') || 'Izoh'}
                      </label>
                      <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('vacancies.resume') || 'Rezyume (fayl)'}
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      />
                    </div>

                    {formError && (
                      <div className="border border-red-300 text-red-700 px-4 py-3 rounded text-sm">
                        {formError}
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting
                          ? t('common.loading') || 'Yuborilmoqda...'
                          : t('vacancies.submit') || 'Yuborish'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setSelectedVacancy(null);
                          setFormError(null);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        {t('common.cancel') || 'Bekor qilish'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vacancies;
