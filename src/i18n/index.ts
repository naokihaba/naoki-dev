export const languages = {
  ja: '日本語',
  en: 'English',
};

export const defaultLang = 'ja';

export const ui = {
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.about': 'About',
    // Home page
    'home.latestPosts': '最新の投稿',
    // About page
    'about.title': 'About Me',
    'about.name': 'NaokiHaba',
    'about.role': 'フロントエンドエンジニア',
    'about.links': 'Links',
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    // Home page
    'home.latestPosts': 'Latest Posts',
    // About page
    'about.title': 'About Me',
    'about.name': 'NaokiHaba',
    'about.role': 'Frontend Engineer',
    'about.links': 'Links',
    // Footer
    'footer.rights': 'All rights reserved.',
  },
} as const;

export function getLangFromUrl(url: URL): keyof typeof ui {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: keyof typeof ui): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}
