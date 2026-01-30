const KEY = "vf_token";

export const authToken = {
  get(): string | null {
    return localStorage.getItem(KEY);
  },
  set(token: string) {
    localStorage.setItem(KEY, token);
  },
  clear() {
    localStorage.removeItem(KEY);
  },
};
