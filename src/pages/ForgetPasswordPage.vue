<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md q-gutter-md" style="width: 400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6 text-center">Forget Password</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" ref="myForm">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            outlined
            dense
            :rules="[(val) => !!val || 'Field is required']"
          />

          <q-btn
            type="submit"
            color="primary"
            label="Send Verification Link"
            class="full-width"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
      <q-card-section class="text-center">
        <p>
          Already have an account?
          <router-link :to="{ name: 'signin' }" class="no-underline">Login</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar'
import axios from 'axios'

Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const myForm = ref(null)
const resetError = ref('')
const loading = ref(false)
const email = ref('')

const onSubmit = async () => {
  resetError.value = ''
  loading.value = true
  try {
    await axios.post(`${BACKEND_URL}/request-password-reset`, {
      email: email.value,
    })

    Notify.create({
      type: 'positive',
      message:
        'Request reset password successful. \nYou can check your mailbox to reset your password',
    })

    myForm.value?.reset()
    email.value = ''
  } catch (error) {
    resetError.value = error.response?.data?.message || 'Request failed'
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
