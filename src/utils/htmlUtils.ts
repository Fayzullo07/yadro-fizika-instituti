import DOMPurify from 'dompurify';

export const sanitizeHtml = (html: string | null | undefined): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html);
};

// Allows base64 embedded images (data: URIs) in addition to normal URLs
export const sanitizeHtmlRich = (html: string | null | undefined): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_URI_REGEXP: /^(?:(?:f|ht)tps?|mailto|tel|data:image\/)/i,
  });
};

/**
 * Strips all HTML tags and returns plain text.
 * Use for alt attributes, titles, and other plain text contexts.
 */
export const sanitizeHtmlNoStyle = (html: string | null | undefined): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html, { FORBID_ATTR: ['style', 'class', 'width', 'float'] });
};

export const stripHtmlRegex = (html: string | null | undefined): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

/**
 * Strips HTML tags and decodes HTML entities (&lsquo; &mdash; etc.)
 */
export const stripHtmlAndDecode = (html: string | null | undefined): string => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};
