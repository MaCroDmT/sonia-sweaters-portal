<template>
  <header :class="['fixed top-0 left-0 right-0 z-50 px-[5%] flex items-center justify-between h-[72px] transition-all duration-400', isScrolled ? 'bg-[rgba(13,27,42,0.97)] shadow-[0_2px_30px_rgba(0,0,0,0.25)]' : '']" id="site-header">
    <a href="#top" class="flex items-center gap-3 no-underline leading-[1.2] group">
      <img src="@/assets/images/image_0.png" alt="SSL Logo" class="h-[44px] w-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.06]">
      <div class="flex flex-col">
        <span class="font-heading text-[1.35rem] font-semibold text-white tracking-[0.06em]">Sonia &amp; Sweaters Limited</span>
        <span class="font-body text-[0.55rem] font-light tracking-[0.28em] text-gold-light uppercase mt-[1px]">Est. 2003</span>
      </div>
    </a>
    <nav class="hidden md:block">
      <ul class="list-none flex gap-8 items-center m-0 p-0">
        <li v-for="item in [{id: 'about-us', text: $t('nav.about')}, {id: 'products', text: $t('nav.products')}, {id: 'values', text: $t('nav.values')}, {id: 'sustainability', text: $t('nav.sustainability')}, {id: 'catalog', text: $t('nav.catalog')}, {id: 'careers', text: $t('nav.careers')}, {id: 'board', text: $t('nav.board')}, {id: 'contact-us', text: $t('nav.contact')}]" :key="item.id">
          <a :href="'#' + item.id" class="relative text-white/85 no-underline text-[0.78rem] font-normal tracking-[0.15em] uppercase transition-colors duration-300 hover:text-gold-light after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full">{{ item.text }}</a>
        </li>
      </ul>
    </nav>

    <!-- Language Selector -->
    <div class="hidden md:flex items-center gap-2 ml-4 group relative">
      <div class="flex items-center gap-1.5 text-white/85 text-[0.7rem] font-medium tracking-[0.1em] uppercase cursor-pointer hover:text-gold-light transition-colors">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span>{{ currentLanguageName }}</span>
      </div>
      
      <div class="absolute top-full right-0 mt-2 w-32 bg-deep-navy border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
        <div class="py-1">
          <button v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)" :class="['w-full text-left px-4 py-2 text-[0.7rem] tracking-wider uppercase transition-colors', locale === lang.code ? 'text-gold-light bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5']">
            {{ lang.name }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-[5px] cursor-pointer p-[5px] md:hidden" id="hamburger" @click="toggleMenu">
      <span :class="['block w-[24px] h-[1.5px] bg-white transition-all duration-300', menuOpen ? 'translate-y-[6.5px] rotate-45' : '']"></span>
      <span :class="['block w-[24px] h-[1.5px] bg-white transition-all duration-300', menuOpen ? 'opacity-0' : '']"></span>
      <span :class="['block w-[24px] h-[1.5px] bg-white transition-all duration-300', menuOpen ? '-translate-y-[6.5px] -rotate-45' : '']"></span>
    </div>
  </header>

  <!-- MOBILE MENU -->
  <div :class="['fixed top-[72px] left-0 right-0 bg-deep-navy p-8 z-[999] border-t border-[rgba(201,168,76,0.3)]', menuOpen ? 'block' : 'hidden']" id="mobileMenu">
    <!-- Mobile Language Selector -->
    <div class="flex flex-wrap gap-3 mb-8 pb-8 border-b border-white/10">
      <button v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)" :class="['px-3 py-1.5 text-[0.65rem] tracking-widest uppercase border transition-colors', locale === lang.code ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-white/60']">
        {{ lang.name }}
      </button>
    </div>
    <ul class="list-none m-0 p-0">
      <li v-for="item in [{id: 'about-us', text: $t('nav.about')}, {id: 'products', text: $t('nav.products')}, {id: 'values', text: $t('nav.values')}, {id: 'sustainability', text: $t('nav.sustainability')}, {id: 'catalog', text: $t('nav.catalog')}, {id: 'careers', text: $t('nav.careers')}, {id: 'board', text: $t('nav.board')}, {id: 'contact-us', text: $t('nav.contact')}]" :key="item.id" class="border-b border-white/10">
        <a :href="'#' + item.id" @click="toggleMenu" class="block py-[0.9rem] text-white/85 no-underline text-[0.85rem] tracking-[0.2em] uppercase">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const isScrolled = ref(false);
const menuOpen = ref(false);

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'ES' },
  { code: 'de', name: 'DE' },
  { code: 'fr', name: 'FR' },
  { code: 'pt', name: 'PT' },
  { code: 'ar', name: 'AR' },
  { code: 'hi', name: 'HI' }
];

const currentLanguageName = computed(() => {
  return languages.find(l => l.code === locale.value)?.name || 'EN';
});

const changeLanguage = (code) => {
  locale.value = code;
  localStorage.setItem('user-locale', code);
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
