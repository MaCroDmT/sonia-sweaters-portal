<template>
  <section id="top" style="padding:0;">
    <div id="hero">
      <div class="hero-slides">
        <div class="hero-slide" :class="{ active: currentSlide === 0 }"></div>
        <div class="hero-slide" :class="{ active: currentSlide === 1 }"></div>
        <div class="hero-slide" :class="{ active: currentSlide === 2 }"></div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <p class="hero-eyebrow">{{ $t('hero.eyebrow') }}</p>
        <h1 class="hero-title" v-html="$t('hero.title').replace(/\n/g, '<br>')"></h1>
        <p class="hero-subtitle">{{ $t('hero.subtitle') }}</p>
        <div class="hero-cta">
          <a href="#about-us" class="btn-primary">{{ $t('hero.discover') }}</a>
          <a href="#products" class="btn-outline">{{ $t('hero.viewProducts') }}</a>
        </div>
      </div>
      <div class="hero-dots">
        <div class="hero-dot" :class="{ active: currentSlide === 0 }" @click="setSlide(0)"></div>
        <div class="hero-dot" :class="{ active: currentSlide === 1 }" @click="setSlide(1)"></div>
        <div class="hero-dot" :class="{ active: currentSlide === 2 }" @click="setSlide(2)"></div>
      </div>
      <a href="#about-us" class="scroll-arrow">
        <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        {{ $t('hero.scroll') }}
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentSlide = ref(0);
const slideCount = 3;
let slideInterval = null;

const setSlide = (n) => {
  currentSlide.value = n;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slideCount;
};

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
});
</script>
