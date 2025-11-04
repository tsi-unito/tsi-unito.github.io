import markdownit from 'markdown-it';

// This library has been made private so that there is no way that the configuration can be changed once it is set up,
// since it unfortunately changes its settings immutably.
const md = new markdownit('zero');
md.enable(['emphasis'])

// We are only exporting what we need once it is completely set up.
export const renderMarkdownInline = (text: string) => md.renderInline(text)