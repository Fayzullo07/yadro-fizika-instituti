import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { generalApi } from '@/services/api';
import { getStoredLanguage } from '@/config/i18n';
import type { GeneralData } from '@/types';

interface GeneralState {
  generalData: GeneralData | null;
  loading: boolean;
  error: string | null;
  lastFetchTime: number | null;
  language: string | null;
  dataVersion: number | null;
  fetchGeneral: (language?: string | null, forceRefresh?: boolean) => Promise<void>;
  clearGeneral: () => void;
}

const useGeneralStore = create<GeneralState>()(
  persist(
    (set, get) => ({
      generalData: null,
      loading: false,
      error: null,
      lastFetchTime: null,
      language: null,
      dataVersion: null, // Ma'lumotlar versiyasini kuzatish uchun

      fetchGeneral: async (language: string | null = null, forceRefresh: boolean = false) => {
        const currentLanguage = language || getStoredLanguage();
        const state = get();

        // Agar cache vaqti o'tgan bo'lsa (5 daqiqadan ko'p), eski ma'lumotlarni tozalash
        if (state.lastFetchTime && Date.now() - state.lastFetchTime > 5 * 60 * 1000) {
          set({
            generalData: null,
            lastFetchTime: null,
            dataVersion: null,
          });
        }

        // Force refresh bo'lmasa va ma'lumotlar allaqachon yuklangan va til o'zgarmagan bo'lsa, qayta yuklamaslik
        if (
          !forceRefresh &&
          state.generalData &&
          state.language === currentLanguage &&
          state.lastFetchTime &&
          Date.now() - state.lastFetchTime < 30 * 1000 // 30 soniya cache (qisqa vaqt)
        ) {
          return;
        }

        // Til o'zgarganda yoki force refresh bo'lsa, yangi ma'lumotlarni yuklash
        set({ loading: true, error: null, language: currentLanguage });

        try {
          const data = await generalApi.getGeneral(currentLanguage);
          // Ma'lumotlar versiyasini yangilash (timestamp)
          const dataVersion = Date.now();

          set({
            generalData: data,
            loading: false,
            error: null,
            lastFetchTime: Date.now(),
            dataVersion: dataVersion,
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },

      clearGeneral: () => {
        set({
          generalData: null,
          loading: false,
          error: null,
          lastFetchTime: null,
          language: null,
          dataVersion: null,
        });
      },
    }),
    {
      name: 'general-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      version: 1, // Version qo'shildi - localStorage o'zgarganda avtomatik tozalanadi
      partialize: (state) => ({
        generalData: state.generalData,
        lastFetchTime: state.lastFetchTime,
        language: state.language,
        dataVersion: state.dataVersion,
      }),
    }
  )
);

export default useGeneralStore;
