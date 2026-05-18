const UZ_MONTHS = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentabr',
  'oktabr',
  'noyabr',
  'dekabr',
];

const LOCALE_MAP: Record<string, string> = {
  ru: 'ru-RU',
  en: 'en-US',
};

export const formatDate = (
  dateStr: string,
  language = 'uz',
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (language === 'uz') {
      return `${date.getDate()} ${UZ_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    }
    return date.toLocaleDateString(LOCALE_MAP[language] ?? 'ru-RU', options);
  } catch {
    return dateStr;
  }
};
