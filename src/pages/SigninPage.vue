<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md q-gutter-md" style="width: 400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6 text-center">Sign In</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit">
          <q-banner v-if="loginError" class="bg-red-2 text-negative q-mb-md">{{
            loginError
          }}</q-banner>

          <q-input
            v-model="email"
            label="Email"
            type="email"
            outlined
            dense
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            v-model="password"
            label="Password"
            type="password"
            outlined
            dense
            :rules="[(val) => !!val || 'Field is required']"
          />

          <div class="text-right q-mt-sm">
            <router-link
              :to="{ name: 'forget-password' }"
              class="text-primary no-underline text-caption"
              >Forgot password?</router-link
            >
          </div>

          <q-btn
            type="submit"
            color="primary"
            label="Sign In"
            class="full-width"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
      <q-card-section class="text-center">
        <p>
          Don't have an account?
          <router-link :to="{ name: 'signup' }" class="no-underline">Register</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'
import { Notify } from 'quasar'

const password = ref('')
const email = ref('')
const loginError = ref('')
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const onSubmit = async () => {
  loginError.value = ''
  loading.value = true
  try {
    const response = await axios.post(`${BACKEND_URL}/signin`, {
      email: email.value,
      password: password.value,
    })

    Notify.create({
      type: 'positive',
      message: 'Login successful',
    })

    const token = response.data.access_token
    const user = response.data.user
    localStorage.setItem('authToken', token)
    authStore.setData({ user, token }) // Store token in Pinia

    router.push('/dashboard') // Redirect to dashboard
  } catch (error) {
    // Notify.create({
    //   type: 'negative',
    //   message: 'Login failed',
    // })
    loginError.value = error.response?.data?.error || 'Login failed'
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
