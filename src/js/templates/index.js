import assign from 'object-assign';

export const TEMPLATES = assign(
  {},
  require('./defaults'),
  require('./adcvd_orders'),
  require('./articles'),
);

export function findTemplate(templateName) {
  if (!TEMPLATES[templateName]) return TEMPLATES.defaults;
  return TEMPLATES[templateName];
}
