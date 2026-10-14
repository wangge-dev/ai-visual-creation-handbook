import path from 'node:path';

// Markdown is read both from GitHub source and from a built/standalone site.
export function publicLinks(markdown, relativeFile, publicURL) {
  return markdown.replace(/\]\(([^\s)]+)\)/g, (match, url) => {
    if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(url)) return match;
    const [, pathname, suffix = ''] = url.match(/^([^?#]*)([?#].*)?$/);
    const resolved = pathname.startsWith('/')
      ? path.posix.normalize(pathname)
      : path.posix.join('/', path.posix.dirname(relativeFile), pathname);
    if (resolved.startsWith('/downloads/')) return `](${publicURL}${resolved}${suffix})`;
    const route = resolved.replace(/\.md$/, '').replace(/\/index$/, '/');
    return `](${publicURL}${route}${suffix})`;
  });
}
