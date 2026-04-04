export const stripHtml = (html) => {
  if (!html) return '';
  
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const stripHtmlRegex = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

