import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML using DOMPurify to prevent XSS attacks.
 * Use when rendering HTML content via dangerouslySetInnerHTML.
 */
export const sanitizeHtml = (html: string | null | undefined): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html);
};

/**
 * Strips all HTML tags and returns plain text.
 * Use for alt attributes, titles, and other plain text contexts.
 */
export const stripHtmlRegex = (html: string | null | undefined): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};
