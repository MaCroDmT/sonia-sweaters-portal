<template>
  <footer>
    <div class="footer-top-row">
      <div class="footer-left">
        <div class="footer-brand">
          <img src="@/assets/images/image_0.png" alt="SSL Logo" class="footer-logo-img" loading="lazy">
          <span class="footer-brand-name">Sonia &amp; Sweaters Limited</span>
        </div>
        <nav class="footer-nav">
          <a href="#about-us">{{ $t('footer.about') }}</a>
          <a href="#products">{{ $t('footer.products') }}</a>
          <a href="#sustainability">{{ $t('footer.sustainability') }}</a>
          <a href="#board">{{ $t('footer.board') }}</a>
          <a href="#contact-us">{{ $t('footer.contact') }}</a>
        </nav>
      </div>
      <div class="footer-map">
        <div class="footer-map-label">{{ $t('footer.headquarters') }}</div>
        <div class="footer-map-wrap">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300.4610598313525!2d90.3096516747972!3d23.92051428222523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c38b8d07d8cd%3A0x7d6c0fc103697842!2sSonia%20%26%20Sweaters%20Limited!5e1!3m2!1sen!2sbd!4v1778744091520!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
    <div class="divider" style="background:rgba(255,255,255,0.08); margin: 3rem 0 1.5rem;"></div>
    <div class="footer-bottom">
      <div class="footer-copy">{{ $t('footer.copy') }}</div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>
