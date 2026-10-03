/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[] | string;
  author?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
}

const BASE_URL = 'https://sitenoble.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/praise_portrait.png`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  author = 'SiteNoble & Praise Egburedi',
  canonicalPath = '/',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  schema,
  noindex = false
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Canonical URL
    const canonicalUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    setLinkTag('canonical', canonicalUrl);

    // 3. Standard SEO Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords) {
      const kwStr = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      setMetaTag('name', 'keywords', kwStr);
    }
    if (author) {
      setMetaTag('name', 'author', author);
    }
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'googlebot', noindex ? 'noindex, nofollow' : 'index, follow');

    // 4. OpenGraph Metadata
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'SiteNoble');
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);
    setMetaTag('property', 'og:locale', 'en_US');

    // 5. Twitter Card Metadata
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);
    setMetaTag('name', 'twitter:creator', '@SiteNobleNexus');
    setMetaTag('name', 'twitter:site', '@SiteNobleNexus');

    // 6. Dynamic JSON-LD Structured Data
    if (schema) {
      let scriptTag = document.getElementById('dynamic-seo-schema') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-seo-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, author, canonicalPath, ogType, ogImage, schema, noindex]);

  return null;
};
