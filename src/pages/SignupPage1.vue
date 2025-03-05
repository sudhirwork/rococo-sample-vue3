<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="max-width: 400px; width: 100%">
      <q-card-section class="text-center">
        <q-img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          style="max-width: 100px; margin: auto"
        />
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleSubmit">
          <q-alert v-if="loginError" color="negative">Invalid Credentials</q-alert>

          <q-input v-model="email" type="email" label="Email address" outlined required />

          <q-input
            v-model="password"
            type="password"
            label="Password"
            outlined
            class="q-mt-md"
            required
          />

          <q-btn type="submit" color="primary" class="full-width q-mt-md">Login</q-btn>
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <p class="q-mt-sm">
          Don't have an account?
          <router-link to="/register" class="text-negative">Register</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: false,
    }
  },
  methods: {
    handleSubmit() {
      // Add login logic here
      if (this.email !== 'test@example.com' || this.password !== 'password') {
        this.loginError = true
      } else {
        this.loginError = false
        // Redirect or perform login actions
      }
    },
  },
}
</script>

<style scoped>
.q-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
