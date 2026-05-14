<template>
  <section id="clients">
    <p class="section-tag">Trusted By</p>
    <h2 class="section-title" style="color:var(--deep-navy);">Some of Our <em>Clients</em></h2>
    <div class="divider" style="margin:0 auto 0;"></div>
    <div class="clients-marquee-wrap">
      <div class="clients-marquee-track">
        <div class="client-logo-item" v-for="(client, index) in clients" :key="index">{{ client }}</div>
        <!-- Duplicate set for seamless loop -->
        <div class="client-logo-item" v-for="(client, index) in clients" :key="'dup-'+index">{{ client }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const clients = ref([
  "The Children's Place", "Carter's", "Fynch-Hatton", "BRAX", "Bootlegger", 
  "CLAN", "CLEO", "Casamoda", "Celio", "Cia Hering", "Convest", "Dimensions", 
  "Express", "George", "IKKS", "LPP S.A.", "Londre"
]);
</script>
