<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md q-gutter-md" style="width: 400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6 text-center">Sign Up</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit">
          <q-banner v-if="signupError" class="bg-red-2 text-negative q-mb-md">{{
            signupError
          }}</q-banner>
          <q-input
            v-model="firstname"
            label="First Name"
            outlined
            dense
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            v-model="lastname"
            label="Last Name"
            outlined
            dense
            :rules="[(val) => !!val || 'Field is required']"
          />
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
            label="Sign Up"
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

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const signupError = ref('')
const loading = ref(false)

Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const onSubmit = async () => {
  signupError.value = ''
  loading.value = true
  try {
    await axios.post(`${BACKEND_URL}/signup`, {
      email: email.value,
      firstname: firstname.value,
      lastname: lastname.value,
    })

    Notify.create({
      type: 'positive',
      message: 'Signup successful. You can check your mailbox to verify your email',
    })
  } catch (error) {
    const message = error.response?.data?.error || 'Signup failed'

    // Notify.create({
    //   type: 'negative',
    //   message,
    // })
    signupError.value = message
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
