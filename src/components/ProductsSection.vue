<template>
  <section id="products">
    <p class="section-tag">What We Make</p>
    <h2 class="section-title">Our <em>Product</em> Range</h2>
    <div class="divider"></div>
    <div class="products-layout">
      <!-- Auto-scrolling gallery on the LEFT -->
      <div class="product-scroll-gallery">
        <div class="gallery-track">
          <div class="gallery-item"><img src="@/assets/images/image_1.jpeg" alt="Men's Collection" class="gallery-img" loading="lazy"><div class="gallery-item-label">Men's Collection</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_2.webp" alt="Men's Hybrid" class="gallery-img" loading="lazy"><div class="gallery-item-label">Men's Hybrid</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_3.webp" alt="Ladies' Collection" class="gallery-img" loading="lazy"><div class="gallery-item-label">Ladies' Collection</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_4.webp" alt="Ladies' Hybrid" class="gallery-img" loading="lazy"><div class="gallery-item-label">Ladies' Hybrid</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_5.jpeg" alt="Kids' Wear" class="gallery-img" loading="lazy"><div class="gallery-item-label">Kids' Wear</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_6.jpeg" alt="Accessories" class="gallery-img" loading="lazy"><div class="gallery-item-label">Accessories</div></div>
          
          <!-- Duplicate for seamless loop -->
          <div class="gallery-item"><img src="@/assets/images/image_1.jpeg" alt="Men's Collection" class="gallery-img" loading="lazy"><div class="gallery-item-label">Men's Collection</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_2.webp" alt="Men's Hybrid" class="gallery-img" loading="lazy"><div class="gallery-item-label">Men's Hybrid</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_3.webp" alt="Ladies' Collection" class="gallery-img" loading="lazy"><div class="gallery-item-label">Ladies' Collection</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_4.webp" alt="Ladies' Hybrid" class="gallery-img" loading="lazy"><div class="gallery-item-label">Ladies' Hybrid</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_5.jpeg" alt="Kids' Wear" class="gallery-img" loading="lazy"><div class="gallery-item-label">Kids' Wear</div></div>
          <div class="gallery-item"><img src="@/assets/images/image_6.jpeg" alt="Accessories" class="gallery-img" loading="lazy"><div class="gallery-item-label">Accessories</div></div>
        </div>
      </div>
      
      <div class="products-list-side">
        <p>From fine gauge pure cashmere to chunky wool blends, our capabilities span across all major knitwear categories. We employ state-of-the-art Shima Seiki machinery (3G to 14G) alongside traditional hand-knitting techniques.</p>
        <ul class="product-category-list">
          <li><span class="cat-name">Men's Knitwear</span><div class="cat-arrow"></div></li>
          <li><span class="cat-name">Ladies' Knitwear</span><div class="cat-arrow"></div></li>
          <li><span class="cat-name">Children &amp; Baby</span><div class="cat-arrow"></div></li>
          <li><span class="cat-name">Hybrid &amp; Woven Combinations</span><div class="cat-arrow"></div></li>
          <li><span class="cat-name">Knitted Accessories</span><div class="cat-arrow"></div></li>
        </ul>
        <div class="products-core-text">
          <strong>Core Yarns:</strong> Cotton, Acrylic, Wool, Cashmere, Blends (Recycled &amp; Organic available).<br><br>
          <strong>Special Finishes:</strong> Acid wash, enzyme wash, overdye, dip dye, printing, embroidery, and hand embellishments.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
