<template CLASS="flex items-center justify-center gap-2">
  <section id="board">
    <p class="section-tag" style="text-align:center;">{{ $t('board.tag') }}</p>
    <h2 class="section-title" style="text-align:center; color:var(--deep-navy);" v-html="$t('board.title').replace(' ', ' <em>') + '</em>'"></h2>
    <div class="divider" style="margin:0 auto 2.5rem;"></div>
    
    <div class="board-grid">
      <div v-for="member in boardMembers" :key="member.name" class="board-card">
        <div class="board-avatar">
          <img :src="member.image" :alt="member.name" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;">
        </div>
        <h3 class="board-name">{{ member.name }}</h3>
        <p class="board-title">{{ $t('board.' + member.roleKey) }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import mahabuburImage from '@/assets/images/mahabubur_rahman.webp'
import shaheenImage from '@/assets/images/mustafa_kamal_shaheen.webp'
import kaiserImage from '@/assets/images/enayetuddin_md_kaiser_khan.webp'
import shahniazImage from '@/assets/images/mohammad_shahniaz.webp'
import ehsanuddinImage from '@/assets/images/md_ehsanuddin_khan.webp'

const boardMembers = [
  { name: 'Mahabubur Rahman', roleKey: 'director', image: mahabuburImage },
  { name: 'Mustafa Kamal Shaheen', roleKey: 'chairman', image: shaheenImage },
  { name: 'Enayetuddin Md Kaiser Khan', roleKey: 'managingDirector', image: kaiserImage },
  { name: 'Mohammad Shahniaz', roleKey: 'director', image: shahniazImage },
  { name: 'Md Ehsanuddin Khan', roleKey: 'coo', image: ehsanuddinImage }
];
</script>
