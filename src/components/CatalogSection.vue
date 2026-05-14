<template>
  <section id="catalog">
    <p class="section-tag">{{ $t('catalog.tag') }}</p>
    <h2 class="section-title" v-html="$t('catalog.title').replace(' ', ' <em>') + '</em>'"></h2>
    <div class="divider"></div>
    <p class="catalog-description">{{ $t('catalog.description') }}</p>
    
    <div class="sway-grid">
      <a v-for="(link, index) in catalogLinks" :key="index" :href="link" target="_blank" rel="noopener" class="sway-card">
        <div class="sway-card-num">{{ String(index + 1).padStart(2, '0') }}</div>
        <div class="sway-card-body">
          <div class="sway-card-title">{{ $t('catalog.catalogNum') }} {{ getRomanNumeral(index + 1) }}</div>
          <div class="sway-card-sub">{{ $t('catalog.range') }}</div>
        </div>
        <svg class="sway-card-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
  </section>
</template>

<script setup>
const catalogLinks = [
  "https://sway.cloud.microsoft/OrvwjWrTnYa48QHc?ref=Link",
  "https://sway.cloud.microsoft/Bs6o3mFCiuuBzHYv?ref=Link&loc=mysways",
  "https://sway.cloud.microsoft/WJvDTGeJtdDaoJYM?ref=Link",
  "https://sway.cloud.microsoft/YZMNqFtXfEVNtNmn?ref=Link",
  "https://sway.cloud.microsoft/ysHm0qKXZ09Ao4SG?ref=Link",
  "https://sway.cloud.microsoft/HJPNTCbnoJaazjp5?ref=Link",
  "https://sway.cloud.microsoft/y8UE18OIekyxfxPI?ref=Link&loc=mysways",
  "https://sway.cloud.microsoft/DXLrAlAUQCR5AE3W?ref=Link&loc=mysways",
  "https://sway.cloud.microsoft/prDXiwHBVYQn2d0B?ref=Link",
  "https://sway.cloud.microsoft/aR1O2UI3fC2pA4eR?ref=Link&loc=mysways"
];

const getRomanNumeral = (num) => {
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  return roman[num - 1] || num;
};
</script>
