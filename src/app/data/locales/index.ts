import { LocaleDictionary } from './locale-strings.interface';
import { enDictionary } from './en';
import { enUsDictionary } from './en-us';
import { enCaDictionary } from './en-ca';
import { frCaDictionary } from './fr-ca';
import { enAuDictionary } from './en-au';
import { jaJpDictionary } from './ja-jp';
import { arSaDictionary } from './ar-sa';
import { arKwDictionary } from './ar-kw';
import { arBhDictionary } from './ar-bh';
import { enInDictionary } from './en-in';
import { hiInDictionary } from './hi-in';

export type { LocaleDictionary } from './locale-strings.interface';

export const DICTIONARIES: Record<string, LocaleDictionary> = {
  'en': enDictionary,
  'en-us': enUsDictionary,
  'en-ca': enCaDictionary,
  'fr-ca': frCaDictionary,
  'en-au': enAuDictionary,
  'ja-jp': jaJpDictionary,
  'ar-sa': arSaDictionary,
  'ar-kw': arKwDictionary,
  'ar-bh': arBhDictionary,
  'en-in': enInDictionary,
  'hi-in': hiInDictionary
};

export function getDictionary(localeCode: string): LocaleDictionary {
  const normalized = (localeCode || '').toLowerCase().trim();
  if (DICTIONARIES[normalized]) {
    return DICTIONARIES[normalized];
  }
  return enDictionary;
}
