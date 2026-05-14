<template>
  <div class="admin-login-container bg-deep-navy min-h-screen flex items-center justify-center p-4">
    <div class="bg-white/5 border border-white/10 p-8 rounded-lg w-full max-w-md shadow-2xl backdrop-blur-sm">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-heading text-white mb-2">Admin Login</h2>
        <p class="text-white/50 text-sm tracking-widest uppercase">Career Management System</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        <div>
          <label class="block text-xs tracking-widest uppercase text-white/50 mb-2">Email</label>
          <input 
            type="email" 
            v-model="email" 
            class="w-full bg-white/5 border border-white/10 text-white p-3 focus:border-gold outline-none transition-colors"
            required
          />
        </div>
        
        <div>
          <label class="block text-xs tracking-widest uppercase text-white/50 mb-2">Password</label>
          <input 
            type="password" 
            v-model="password" 
            class="w-full bg-white/5 border border-white/10 text-white p-3 focus:border-gold outline-none transition-colors"
            required
          />
        </div>

        <div v-if="errorMsg" class="text-red-400 text-sm bg-red-400/10 p-3 border-l-2 border-red-400">
          {{ errorMsg }}
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="mt-4 w-full bg-gold hover:bg-gold-light text-deep-navy font-medium tracking-widest uppercase text-sm p-4 transition-colors disabled:opacity-50"
        >
          {{ isLoading ? 'Authenticating...' : 'Sign In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    errorMsg.value = ''
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/admin')
  } catch (err) {
    console.error(err)
    errorMsg.value = 'Invalid email or password.'
  } finally {
    isLoading.value = false
  }
}
</script>
