import { create } from 'zustand';
import { socialLinksApi } from '@/services/api';
import type { SocialLinksData } from '@/types';

interface SocialLinksState {
  data: SocialLinksData | null;
  /** true once a request has finished, successfully or not */
  settled: boolean;
  fetch: () => void;
}

let pending = false;

/** Shared, non-persisted cache: Header, Footer and Contact all read one request. */
const useSocialLinksStore = create<SocialLinksState>((set, get) => ({
  data: null,
  settled: false,
  fetch: () => {
    if (pending || get().settled) return;
    pending = true;
    socialLinksApi
      .get()
      .then((res) => set({ data: res.data, settled: true }))
      .catch(() => set({ settled: true }))
      .finally(() => {
        pending = false;
      });
  },
}));

export default useSocialLinksStore;
