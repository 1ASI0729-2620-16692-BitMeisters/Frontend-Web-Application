export const SUPPORTED_LANGUAGES = ['en-US', 'es-419'] as const;

const STORAGE_KEY = 'fleetsafe-language';
const DEFAULT_LANGUAGE = 'en-US';

export function readLanguagePreference(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) return stored;
  } catch {}
  return navigator.language?.toLowerCase().startsWith('es') ? 'es-419' : DEFAULT_LANGUAGE;
}

export function saveLanguagePreference(language: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {}
}
