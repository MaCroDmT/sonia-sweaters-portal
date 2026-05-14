<template>
  <section id="contact-us">
    <p class="section-tag">{{ $t('contact.tag') }}</p>
    <h2 class="section-title" v-html="$t('contact.title').replace(' ', ' <em>') + '</em>'"></h2>
    <div class="divider"></div>
    <div class="contact-grid">
      <div class="contact-info">
        <h3>{{ $t('contact.office') }}</h3>
        <p v-html="$t('contact.address').replace('\n', '<br>')"></p>
        
        <h3>{{ $t('contact.inquiries') }}</h3>
        <a href="mailto:info@soniagroup.com">info@soniagroup.com</a>
        <a href="tel:+8801732582976">+8801732582976</a>
        
        <h3>{{ $t('contact.sales') }}</h3>
        <a href="mailto:sales@soniagroup.com">sales@soniagroup.com</a>
        
        <div class="contact-links">
          <a href="https://www.linkedin.com/company/soniasweaters/" class="contact-link-btn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            {{ $t('contact.follow') }}
          </a>
        </div>
      </div>
      
      <div class="contact-form-area">
        <h3>{{ $t('contact.send') }}</h3>
        <form id="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="cf-name">{{ $t('contact.fullName') }}</label>
            <input type="text" id="cf-name" v-model="form.name" :placeholder="$t('contact.namePlaceholder')" required>
          </div>
          <div class="form-group">
            <label for="cf-email">{{ $t('contact.email') }}</label>
            <input type="email" id="cf-email" v-model="form.email" :placeholder="$t('contact.emailPlaceholder')" required>
          </div>
          <div class="form-group">
            <label for="cf-message">{{ $t('contact.message') }}</label>
            <textarea id="cf-message" v-model="form.message" rows="5" :placeholder="$t('contact.messagePlaceholder')" required></textarea>
          </div>
          <button type="submit" id="cf-submit" class="form-submit" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="btn-spinner"></span>
            {{ isSubmitting ? $t('contact.btnSending') : $t('contact.btnSend') }}
          </button>
          
          <div v-if="feedback" class="form-feedback" :class="feedbackType" style="display:flex;">
            <svg v-if="feedbackType === 'success'" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <svg v-else viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ feedbackType === 'success' ? $t('contact.success') : $t('contact.error') }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const feedback = ref('');
const feedbackType = ref(''); // 'success' or 'error'

const submitForm = async () => {
  isSubmitting.value = true;
  feedback.value = '';
  
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    });
    
    if (response.ok) {
      feedbackType.value = 'success';
      feedback.value = '✓ Message sent. We will be in touch shortly.';
      form.value = { name: '', email: '', message: '' }; // Reset form
    } else {
      feedbackType.value = 'error';
      feedback.value = 'Something went wrong. Please try again.';
    }
  } catch (error) {
    feedbackType.value = 'error';
    feedback.value = 'Network error. Please email us directly at info@soniagroup.com';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
