import { atom, selector } from 'recoil';
import type { AuthResponse } from '../types/auth.ts';
import { getLoggedInUser } from '../services/user.service.ts';

export const userAtom = atom<AuthResponse | null>({
  key: 'user',
  default: selector({
    key: 'userDefaultSelector',
    get: async () => {
      try {
        const user = await getLoggedInUser();
        return user ?? null;
      } catch {
        return null;
      }
    },
  }),
});

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    return get(userAtom);
  },
});

export const isAuthenticated = selector({
  key: 'isAuthenticated',
  get: ({ get }) => {
    return !!get(userAtom);
  },
});
