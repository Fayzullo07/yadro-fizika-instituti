import { useState } from 'react';
import { useVacancies, useCreateApplication } from '@/hooks/useApplications';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import { sanitizeHtml, stripHtmlAndDecode } from '@/utils/htmlUtils';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
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
  const [activeId, setActiveId] = useState<number | null>(null);
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

  const vacancies: Vacancy[] = vacanciesData?.data || [];
  const active = vacancies.find((v) => v.id === activeId) ?? vacancies[0];

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
    return (
      <>
        <PageTitle>{t('nav.ochiq.vacancies') || 'Vakansiyalar'}</PageTitle>
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PageTitle>{t('nav.ochiq.vacancies') || 'Vakansiyalar'}</PageTitle>
        <div className="text-center text-red-600">{t('common.error') || 'Xatolik yuz berdi'}</div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.ochiq.vacancies') || 'Vakansiyalar'}</PageTitle>

      <div>
        {active ? (
          <div className="flex flex-col gap-[var(--space-6)] lg:flex-row lg:items-start">
            <ul className="flex flex-col gap-[var(--space-2)] lg:w-[460px] lg:shrink-0">
              {vacancies.map((vacancy) => {
                const isActive = vacancy.id === active.id;
                return (
                  <li key={vacancy.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(vacancy.id)}
                      aria-current={isActive}
                      className={`block w-full rounded-[var(--radius-md)] border-l-[3px] px-[var(--space-4)] py-[var(--space-3)] text-left transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        isActive
                          ? 'border-[var(--color-brand-700)] bg-[var(--color-brand-50)]'
                          : 'border-transparent bg-[var(--color-neutral-0)] hover:bg-[var(--color-brand-50)]'
                      }`}
                    >
                      <span className="block text-[16px] font-bold leading-6 text-[var(--color-neutral-900)]">
                        {stripHtmlAndDecode(vacancy.name)}
                      </span>
                      {vacancy.created_at && (
                        <span className="mt-[var(--space-1)] block text-[14px] leading-5 text-[var(--color-neutral-500)]">
                          {vacancy.created_at}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <article
              key={active.id}
              className="min-w-0 flex-1 rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] md:p-[var(--space-10)] lg:sticky lg:top-[var(--space-6)]"
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
                {t('vacancies.vacancy') || 'Vakansiya'}
              </span>
              {active.name && (
                <h2
                  className="mt-[var(--space-2)] text-[24px] font-bold leading-8 text-[var(--color-neutral-900)] md:text-[32px] md:leading-10"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(active.name) }}
                />
              )}

              {(active.salary || active.deadline) && (
                <dl className="mt-[var(--space-4)] flex flex-wrap gap-x-[var(--space-8)] gap-y-[var(--space-3)]">
                  {active.salary && (
                    <div>
                      <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                        {t('vacancies.salary')}
                      </dt>
                      <dd className="text-[16px] font-bold leading-6 text-[var(--color-brand-700)]">
                        {active.salary}
                      </dd>
                    </div>
                  )}
                  {active.deadline && (
                    <div>
                      <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                        {t('vacancies.deadline')}
                      </dt>
                      <dd className="text-[16px] font-bold leading-6 text-[var(--color-brand-700)]">
                        {active.deadline}
                      </dd>
                    </div>
                  )}
                </dl>
              )}

              {active.desc && (
                <div
                  className="mt-[var(--space-6)] text-[16px] leading-7 text-[var(--color-neutral-700)]"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(active.desc) }}
                />
              )}

              {active.requirements && (
                <div className="mt-[var(--space-6)]">
                  <h3 className="mb-[var(--space-2)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
                    {t('vacancies.requirements')}
                  </h3>
                  <div
                    className="text-[16px] leading-7 text-[var(--color-neutral-700)]"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(active.requirements) }}
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => openApplicationModal(active)}
                className="mt-[var(--space-8)] inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-brand-950)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-600)] hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {t('vacancies.apply') || 'Ariza yuborish'} →
              </button>
            </article>
          </div>
        ) : (
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] py-[var(--space-12)] text-center text-[var(--color-neutral-500)] shadow-[var(--shadow-card)]">
            <p>{t('vacancies.noVacancies') || 'Hozirda vakansiyalar mavjud emas'}</p>
          </div>
        )}

        {/* Application Modal */}
        {showModal && selectedVacancy && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-[var(--color-neutral-0)] rounded border border-[var(--color-neutral-300)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-neutral-100)]">
                  <h2 className="text-xl font-semibold text-[var(--color-neutral-900)]">
                    {t('vacancies.applyFor') || 'Ariza yuborish'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedVacancy(null);
                      setFormError(null);
                      setFormSuccess(false);
                    }}
                    className="text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-700)]"
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
                  <div className="mb-4 pb-4 border-b border-[var(--color-neutral-100)]">
                    <p className="text-sm text-[var(--color-neutral-700)] mb-1">
                      {t('vacancies.vacancy') || 'Vakansiya'}:
                    </p>
                    <div
                      className="text-[var(--color-neutral-900)] font-medium"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedVacancy.name) }}
                    />
                  </div>
                )}

                {formSuccess ? (
                  <div className="text-center py-8">
                    <p className="text-base text-[var(--color-neutral-700)] mb-2">
                      {t('vacancies.success') || 'Arizangiz muvaffaqiyatli yuborildi!'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">
                        {t('vacancies.fullname') || "To'liq ism"} *
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[var(--color-neutral-300)] rounded focus:outline-none focus:border-[var(--color-neutral-500)]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">
                        {t('vacancies.email') || 'Email'} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[var(--color-neutral-300)] rounded focus:outline-none focus:border-[var(--color-neutral-500)]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">
                        {t('vacancies.phone') || 'Telefon'} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-[var(--color-neutral-300)] rounded focus:outline-none focus:border-[var(--color-neutral-500)]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">
                        {t('vacancies.comment') || 'Izoh'}
                      </label>
                      <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-[var(--color-neutral-300)] rounded focus:outline-none focus:border-[var(--color-neutral-500)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">
                        {t('vacancies.resume') || 'Rezyume (fayl)'}
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-[var(--color-neutral-300)] rounded focus:outline-none focus:border-[var(--color-neutral-500)]"
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
                        className="flex-1 px-4 py-2 border border-[var(--color-neutral-300)] rounded hover:bg-[var(--color-neutral-50)] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                        className="px-4 py-2 border border-[var(--color-neutral-300)] rounded hover:bg-[var(--color-neutral-50)] transition-colors text-sm font-medium"
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
