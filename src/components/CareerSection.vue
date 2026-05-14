<template>
  <section id="careers" class="bg-ivory py-24 px-[5%]">
    <p class="section-tag text-center text-[0.68rem] font-medium tracking-[0.38em] uppercase text-gold mb-4">{{ $t('careers.tag') }}</p>
    <h2 class="section-title text-center font-heading text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.2] mb-8 text-deep-navy" v-html="$t('careers.title').replace(' ', ' <em>') + '</em>'">
    </h2>
    <div class="divider w-[50px] h-[1px] bg-gold mx-auto mb-10"></div>
    
    <div class="max-w-4xl mx-auto">
      <p v-if="loading" class="text-center text-text-light">{{ $t('careers.loading') }}</p>
      <p v-else-if="jobs.length === 0" class="text-center text-text-light italic">{{ $t('careers.noJobs') }}</p>
      
      <div v-else class="flex flex-col gap-4">
        <div v-for="job in jobs" :key="job.id" class="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow group">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 class="font-heading text-xl font-medium text-deep-navy group-hover:text-gold transition-colors">{{ job.title }}</h3>
              <div class="text-xs tracking-widest uppercase text-text-light mt-2 flex flex-wrap gap-3">
                <span>{{ job.department }}</span>
                <span>•</span>
                <span>{{ job.location }}</span>
                <span>•</span>
                <span>{{ job.type }}</span>
              </div>
            </div>
            <button @click="openApplication(job)" class="self-start md:self-center bg-transparent border border-gold text-deep-navy hover:bg-gold-light hover:text-deep-navy px-6 py-2 text-xs tracking-widest uppercase transition-colors shrink-0">
              {{ $t('careers.applyNow') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Modal -->
    <div v-if="selectedJob" class="fixed inset-0 bg-deep-navy/90 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button @click="closeApplication" class="absolute top-4 right-4 text-gray-400 hover:text-deep-navy text-2xl leading-none z-10">&times;</button>
        
        <div class="p-8 border-b border-gray-100 bg-gray-50">
          <p class="text-[0.65rem] tracking-widest uppercase text-gold font-medium mb-1">{{ $t('careers.applyingFor') }}</p>
          <h3 class="font-heading text-2xl text-deep-navy">{{ selectedJob.title }}</h3>
          
          <div v-if="selectedJob.description" class="mt-4 text-sm text-text-body line-clamp-3">
            {{ selectedJob.description }}
          </div>
        </div>

        <form @submit.prevent="submitApplication" class="p-8 flex flex-col gap-5">
          <div>
            <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{{ $t('careers.fullName') }}</label>
            <input type="text" v-model="form.name" required class="w-full border border-gray-300 p-3 text-sm focus:border-gold outline-none bg-transparent">
          </div>
          
          <div>
            <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{{ $t('careers.email') }}</label>
            <input type="email" v-model="form.email" required class="w-full border border-gray-300 p-3 text-sm focus:border-gold outline-none bg-transparent">
          </div>
          
          <div>
            <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">{{ $t('careers.message') }}</label>
            <textarea v-model="form.message" rows="4" required class="w-full border border-gray-300 p-3 text-sm focus:border-gold outline-none bg-transparent"></textarea>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
              {{ $t('careers.resume') }} <span v-if="selectedJob.resumeRequired" class="text-red-500">*</span>
            </label>
            <input 
              type="file" 
              ref="fileInput"
              @change="handleFileChange"
              accept=".pdf,.doc,.docx"
              :required="selectedJob.resumeRequired"
              class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-gold/10 file:text-deep-navy hover:file:bg-gold/20 transition-colors"
            >
          </div>

          <div v-if="submitStatus" :class="['mt-2 p-3 text-sm border-l-2', submitStatus.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800']">
            {{ submitStatus.type === 'success' ? $t('careers.success') : $t('careers.error') }}
          </div>

          <button type="submit" :disabled="isSubmitting" class="mt-4 w-full bg-gold hover:bg-gold-light text-deep-navy font-medium tracking-widest uppercase text-sm p-4 transition-colors disabled:opacity-50 flex justify-center items-center">
            <span v-if="isSubmitting" class="inline-block w-4 h-4 border-2 border-deep-navy/30 border-t-deep-navy rounded-full animate-spin mr-2"></span>
            {{ isSubmitting ? $t('careers.sending') : $t('careers.submit') }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'

const jobs = ref([])
const loading = ref(true)
const selectedJob = ref(null)
const fileInput = ref(null)
const isSubmitting = ref(false)
const submitStatus = ref(null)

const form = ref({
  name: '',
  email: '',
  message: '',
  file: null
})

onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, 'jobs'))
    
    // Just map all jobs without filtering to see if ANY exist
    const allJobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    jobs.value = allJobs
    
    // Sort safely in case createdAt is missing
    jobs.value.sort((a, b) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0
      return timeB - timeA
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    // Create a fake job to display the error on screen so the user can see it
    jobs.value = [{
      id: 'error',
      title: 'Database Error!',
      department: 'System',
      location: 'N/A',
      type: 'Error',
      description: error.message
    }]
  } finally {
    loading.value = false
  }
})

const openApplication = (job) => {
  selectedJob.value = job
  submitStatus.value = null
  form.value = { name: '', email: '', message: '', file: null }
  if (fileInput.value) fileInput.value.value = ''
}

const closeApplication = () => {
  selectedJob.value = null
}

const handleFileChange = (e) => {
  if (e.target.files.length > 0) {
    form.value.file = e.target.files[0]
  } else {
    form.value.file = null
  }
}

const submitApplication = async () => {
  if (selectedJob.value.resumeRequired && !form.value.file) {
    submitStatus.value = { type: 'error', message: 'A resume is required for this position.' }
    return
  }

  isSubmitting.value = true
  submitStatus.value = null

  const formData = new FormData()
  formData.append('jobTitle', selectedJob.value.title)
  formData.append('name', form.value.name)
  formData.append('email', form.value.email)
  formData.append('message', form.value.message)
  if (form.value.file) {
    formData.append('resume', form.value.file)
  }

  try {
    const response = await fetch('http://localhost:3000/api/apply', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) throw new Error('Network response was not ok')
    
    submitStatus.value = { type: 'success', message: 'Your application has been submitted successfully. We will be in touch!' }
    form.value = { name: '', email: '', message: '', file: null }
    if (fileInput.value) fileInput.value.value = ''
    
    setTimeout(() => {
      if (submitStatus.value?.type === 'success') closeApplication()
    }, 3000)
  } catch (error) {
    console.error('Submission error:', error)
    submitStatus.value = { type: 'error', message: 'There was an error sending your application. Please try again later.' }
  } finally {
    isSubmitting.value = false
  }
}
</script>
