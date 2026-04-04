import DOMPurify from 'dompurify';

export const sanitizeHtml = (html: string | null | undefined): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html);
};

export const stripHtml = (html: string | null | undefined): string => {
  if (!html) return '';

  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const stripHtmlRegex = (html: string | null | undefined): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

