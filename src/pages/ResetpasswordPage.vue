<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md q-gutter-md" style="width: 400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6 text-center">{{ title }}</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit">
          <q-alert v-if="resetPasswordError" color="negative">{{ resetPasswordError }}</q-alert>
          <q-input
            v-model="password"
            label="Password"
            type="password"
            outlined
            dense
            :rules="[(val) => !!val || 'Field is required']"
          />

          <q-input
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            outlined
            dense=""
            lazy-rules
            :rules="[(val) => val === password || 'Passwords do not match']"
          />

          <q-btn
            type="submit"
            color="primary"
            :label="title"
            class="full-width"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
      <q-card-section class="text-center">
        <p>
          Already have an account?
          <router-link :to="{ name: 'signin' }"><span class="text-none">Login</span></router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Notify } from 'quasar'
Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
})
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const password = ref('')
const confirmPassword = ref('')
const token = ref('')
const resetPasswordError = ref('')
const loading = ref(false)

const route = useRoute()
const router = useRouter()

const title = route.path === '/reset-password' ? 'Reset Password' : 'Set Password'

onMounted(() => {
  const queryParams = route.query
  token.value = queryParams.token

  if (token.value == undefined) {
    router.push({ name: 'signin' })
    return
  }

  router.replace({ path: route.path, query: {} })
})

const onSubmit = async () => {
  resetPasswordError.value = ''
  loading.value = true
  try {
    await axios.post(`${BACKEND_URL}/reset-password`, {
      token: token.value,
      password: password.value,
    })

    Notify.create({
      type: 'positive',
      message: 'Password reset successfully',
    })

    router.push({ name: 'signin' })
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: error.message || 'Password reset failed. Try again.',
    })
  } finally {
    loading.value = false
  }
}
</script>
<style>
.q-page {
  min-height: 100vh;
}
</style>
