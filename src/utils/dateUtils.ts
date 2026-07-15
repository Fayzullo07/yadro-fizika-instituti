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

const UZ_MONTHS_SHORT = [
  'Yan',
  'Fev',
  'Mar',
  'Apr',
  'May',
  'Iyun',
  'Iyul',
  'Avg',
  'Sen',
  'Okt',
  'Noy',
  'Dek',
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

export const getDayMonth = (dateStr: string, language = 'uz'): { day: string; month: string } => {
  const date = new Date(dateStr);
  const day = String(date.getDate());
  if (language === 'uz') {
    return { day, month: UZ_MONTHS_SHORT[date.getMonth()] };
  }
  const month = date.toLocaleDateString(LOCALE_MAP[language] ?? 'ru-RU', { month: 'short' });
  return { day, month };
};
