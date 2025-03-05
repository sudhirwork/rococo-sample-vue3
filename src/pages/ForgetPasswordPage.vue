<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md q-gutter-md" style="width: 400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6 text-center">Sign In</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit">
          <q-input v-model="email" label="Email" type="email" outlined dense class="q-mb-md" />

          <q-btn type="submit" color="primary" label="Send Verification Link" class="full-width" />
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
import { ref } from 'vue'

const password = ref('')
const email = ref('')

const onSubmit = () => {
  console.log('Sign Up with:', password.value, email.value)
}
</script>
<style>
.q-page {
  min-height: 100vh;
}
</style>
