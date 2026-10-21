import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
  canonicalPath?: string;
  robots?: string;
  ogImage?: string;
}

const BASE_URL = 'https://tulsipmedia.com';
const DEFAULT_OG_IMAGE = 'https://tulsipmedia.com/img/og-preview.png';

const PageMeta = ({
  title,
  description,
  canonicalPath = '/',
  robots = 'index, follow',
  ogImage = DEFAULT_OG_IMAGE,
}: PageMetaProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const canonicalUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`;

    setMeta('meta[name="title"]', 'name', 'title', title);
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', robots);

    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    let linkCanonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);
  }, [title, description, canonicalPath, robots, ogImage]);

  return null;
};

export default PageMeta;
