<template>
  <div class="admin-dashboard min-h-screen bg-ivory font-body">
    <!-- Admin Header -->
    <header class="bg-deep-navy px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div class="text-white">
        <h1 class="font-heading text-xl font-semibold tracking-wide">CMS Portal</h1>
        <span class="text-[0.6rem] text-gold-light tracking-widest uppercase">Sonia &amp; Sweaters Limited</span>
      </div>
      <button @click="handleLogout" class="text-white/70 hover:text-white text-sm tracking-widest uppercase transition-colors">
        Log Out
      </button>
    </header>

    <main class="max-w-6xl mx-auto p-8" style="padding: 40px 20px; max-width: 1200px; margin: 80px auto 0 auto;">
      <div class="flex justify-between items-center mb-8" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h2 class="font-heading text-3xl text-deep-navy" style="font-size: 24px; font-weight: bold;">Manage Jobs</h2>
        <button @click="openModal()" class="bg-gold hover:bg-gold-light text-deep-navy px-6 py-3 text-xs font-medium tracking-widest uppercase transition-colors" style="background-color: #C9A84C; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer;">
          + Post New Job
        </button>
      </div>

      <!-- Jobs Table -->
      <div class="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-200">
              <th class="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th class="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Resume Required</th>
              <th class="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="jobs.length === 0" class="border-b border-gray-100">
              <td colspan="5" class="p-8 text-center text-gray-500 italic">No jobs found. Click "Post New Job" to create one.</td>
            </tr>
            <tr v-for="job in jobs" :key="job.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="p-4">
                <div class="font-medium text-deep-navy">{{ job.title }}</div>
                <div class="text-xs text-gray-500">{{ job.location }} • {{ job.type }}</div>
              </td>
              <td class="p-4 text-sm text-gray-600">{{ job.department }}</td>
              <td class="p-4">
                <span :class="['px-2 py-1 text-[0.65rem] uppercase tracking-wider rounded-full', job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800']">
                  {{ job.isActive ? 'Active' : 'Hidden' }}
                </span>
              </td>
              <td class="p-4 text-sm text-gray-600">{{ job.resumeRequired ? 'Yes' : 'No' }}</td>
              <td class="p-4 text-right" style="padding: 15px; text-align: right;">
                <button @click="openModal(job)" class="text-deep-navy hover:text-gold text-sm underline mr-4" style="margin-right: 15px; text-decoration: underline; color: #0D1B2A; cursor: pointer;">Edit</button>
                <button @click="deleteJob(job.id)" class="text-red-500 hover:text-red-700 text-sm underline" style="text-decoration: underline; color: red; cursor: pointer;">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- Job Editor Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-deep-navy/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h3 class="font-heading text-2xl text-deep-navy">{{ editingJobId ? 'Edit Job' : 'Create New Job' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-deep-navy text-2xl leading-none">&times;</button>
        </div>
        
        <form @submit.prevent="saveJob" class="p-6 flex flex-col gap-5">
          <div class="grid grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Job Title</label>
              <input type="text" v-model="form.title" class="w-full border border-gray-300 p-2 focus:border-gold outline-none" required>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Department</label>
              <input type="text" v-model="form.department" class="w-full border border-gray-300 p-2 focus:border-gold outline-none" required>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Location</label>
              <input type="text" v-model="form.location" class="w-full border border-gray-300 p-2 focus:border-gold outline-none" required>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Type</label>
              <select v-model="form.type" class="w-full border border-gray-300 p-2 focus:border-gold outline-none" required>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Description</label>
            <textarea v-model="form.description" rows="4" class="w-full border border-gray-300 p-2 focus:border-gold outline-none" required></textarea>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Requirements (one per line)</label>
            <textarea v-model="formRequirementsText" rows="4" placeholder="5+ years experience&#10;Excellent communication skills" class="w-full border border-gray-300 p-2 focus:border-gold outline-none"></textarea>
          </div>

          <div class="flex items-center gap-6 mt-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="form.resumeRequired" class="w-4 h-4 accent-gold">
              <span class="text-sm font-medium text-gray-700">Require Resume Upload</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="form.isActive" class="w-4 h-4 accent-gold">
              <span class="text-sm font-medium text-gray-700">Job is Active (Public)</span>
            </label>
          </div>

          <div class="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" @click="closeModal" class="px-6 py-2 border border-gray-300 text-gray-600 text-xs font-medium uppercase tracking-widest hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" class="px-6 py-2 bg-deep-navy text-white text-xs font-medium uppercase tracking-widest hover:bg-warm-charcoal transition-colors">Save Job</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../../firebase'
import { signOut } from 'firebase/auth'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore'

const router = useRouter()
const jobs = ref([])
const isModalOpen = ref(false)
const editingJobId = ref(null)

const form = ref({
  title: '',
  department: '',
  location: '',
  type: 'Full-Time',
  description: '',
  resumeRequired: true,
  isActive: true,
  requirements: []
})

const formRequirementsText = computed({
  get: () => form.value.requirements ? form.value.requirements.join('\n') : '',
  set: (val) => {
    form.value.requirements = val.split('\n').filter(r => r.trim() !== '')
  }
})

const fetchJobs = async () => {
  try {
    const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    jobs.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching jobs:", error)
  }
}

onMounted(() => {
  fetchJobs()
})

const openModal = (job = null) => {
  if (job) {
    editingJobId.value = job.id
    form.value = { ...job }
  } else {
    editingJobId.value = null
    form.value = {
      title: '', department: '', location: '', type: 'Full-Time',
      description: '', resumeRequired: true, isActive: true, requirements: []
    }
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveJob = async () => {
  try {
    if (editingJobId.value) {
      const jobRef = doc(db, 'jobs', editingJobId.value)
      await updateDoc(jobRef, { ...form.value })
    } else {
      await addDoc(collection(db, 'jobs'), {
        ...form.value,
        createdAt: serverTimestamp()
      })
    }
    closeModal()
    fetchJobs()
  } catch (error) {
    console.error("Error saving job:", error)
    alert("Failed to save job. Check console.")
  }
}

const deleteJob = async (id) => {
  if (confirm('Are you sure you want to delete this job?')) {
    try {
      await deleteDoc(doc(db, 'jobs', id))
      fetchJobs()
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }
}

const handleLogout = async () => {
  await signOut(auth)
  router.push('/admin/login')
}
</script>
