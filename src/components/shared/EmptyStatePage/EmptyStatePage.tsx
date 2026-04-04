import React from 'react';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

interface EmptyStatePageProps {
  title: string;
  message: string;
  comingSoonText?: string;
}

const EmptyStatePage: React.FC<EmptyStatePageProps> = ({ title, message, comingSoonText }) => {
  return (
    <section>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <Breadcrumb />

        <div className="max-w-4xl mx-auto mt-10">
          <header className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 bg-[#013d8c] rounded-full" />
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold tracking-[0.15em] text-gray-900 uppercase">
              {title}
            </h1>
          </header>

          <section className="text-center py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#013d8c]/10 flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-[#013d8c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {comingSoonText || "Tez orada qo'shiladi"}
              </h2>

              <p className="text-gray-600 text-lg max-w-md">{message}</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default EmptyStatePage;
