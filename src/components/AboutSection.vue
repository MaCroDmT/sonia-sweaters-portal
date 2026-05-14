<template>
  <section id="about-us">
    <div>
      <p class="section-tag">{{ $t('about.tag') }}</p>
      <h2 class="section-title" v-html="$t('about.title').replace(/\n/g, '<br>')"></h2>
      <div class="divider"></div>
      
      <p>{{ $t('about.description1') }}</p>
      <p>{{ $t('about.description2') }}</p>
      <p>{{ $t('about.description3') }}</p>
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-num">20+</div>
          <div class="stat-label">{{ $t('about.stats.years') }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">70+</div>
          <div class="stat-label">{{ $t('about.stats.clients') }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">100%</div>
          <div class="stat-label">{{ $t('about.stats.commitment') }}</div>
        </div>
      </div>
    </div>
    <div class="about-visual">
      <div class="about-visual-main"></div>
      <div class="about-visual-label">
        <span v-html="$t('about.since').replace(' ', '<br>')"></span>
        <span>{{ $t('about.location') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic goes here if needed
</script>
