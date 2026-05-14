<template>
  <section id="sustainability">
    <p class="section-tag">For the Future</p>
    <h2 class="section-title">Committed to <em>Sustainability</em></h2>
    <div class="divider"></div>
    <div class="sustainability-layout">
      <div class="sust-sidebar">
        <div class="sust-sidebar-sticky">
          <ul class="sust-nav">
            <li><a href="#sust-environment" :class="{ active: activeSection === 'sust-environment' }">Environmental Impact</a></li>
            <li><a href="#sust-workplaces" :class="{ active: activeSection === 'sust-workplaces' }">Empowered Workplaces</a></li>
            <li><a href="#sust-community" :class="{ active: activeSection === 'sust-community' }">Community Initiatives</a></li>
            <li><a href="#sust-compliance" :class="{ active: activeSection === 'sust-compliance' }">Certifications</a></li>
          </ul>
        </div>
      </div>
      <div class="sust-content">
        <div id="sust-environment" class="sust-block">
          <h3>Environmental Impact</h3>
          <p>We are continuously reducing our carbon footprint through energy-efficient machinery and solar panel integrations across our facilities. Our water treatment plants ensure zero harmful discharge into local waterways.</p>
          <p>By offering collections made from GOTS-certified organic cotton and recycled polyester blends, we help our partners meet their eco-goals.</p>
          <div class="sust-img-wrap"><img src="@/assets/images/sust_env.jpg" alt="Environmental Resilience & Sustainable Materials" class="sust-img" loading="lazy"></div>
        </div>
        <div id="sust-workplaces" class="sust-block">
          <h3>Empowered Workplaces</h3>
          <p>Our workforce is our greatest asset. We provide fair wages, comprehensive healthcare, and continuous skill development programs. We champion gender equality, with women occupying over 60% of our supervisory roles.</p>
          <div class="sust-img-wrap"><img src="@/assets/images/sust_work.jpg" alt="Safe & Fair Workplaces" class="sust-img" loading="lazy"></div>
        </div>
        <div id="sust-community" class="sust-block">
          <h3>Community Initiatives</h3>
          <p>Beyond our factory walls, we invest in local infrastructure, supporting schools and medical clinics in the communities where our employees live.</p>
          <div class="sust-img-wrap"><img src="@/assets/images/sust_comm.jpg" alt="Our Community" class="sust-img" loading="lazy"></div>
        </div>
        <div id="sust-compliance" class="sust-block">
          <h3>Global Certifications</h3>
          <p>Our commitment is backed by international auditors. We proudly hold current certifications from ACCORD, BSCI, SEDEX, OEKO-TEX, and ISO 9001, guaranteeing transparency and ethical practices at every level.</p>
          <div class="sust-placeholder">Verified by the world's leading standards.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeSection = ref('');
let observer = null;

onMounted(() => {
  const options = {
    threshold: 0.4
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, options);

  ['sust-environment', 'sust-workplaces', 'sust-community', 'sust-compliance'].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
