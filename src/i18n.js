import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import bn from './locales/bn.json'
import es from './locales/es.json'
import zh from './locales/zh.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import pt from './locales/pt.json'
import ar from './locales/ar.json'
import hi from './locales/hi.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    bn,
    es,
    zh,
    de,
    fr,
    pt,
    ar,
    hi
  }
})

export default i18n
