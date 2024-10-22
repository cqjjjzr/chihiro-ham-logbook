import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from './generated/locale-codes.js';

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale: string) => import(`./generated/locales/${locale}.ts`),
});

export const defaultLocale = sourceLocale;
export const localesWithMetadata = [
  {
    'name': 'zh-Hans',
    'displayName': '简体中文',
    'isDefault': true,
  },
  {
    'name': 'ja',
    'displayName': '日本語',
    'isDefault': false,
  },
  {
    'name': 'en',
    'displayName': 'English',
    'isDefault': false,
  },
];
