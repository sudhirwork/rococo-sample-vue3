<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Dashboard</q-toolbar-title>

        <q-btn label="Logout" color="negative" @click="logout" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="flex flex-center">
        <h3>Hii, {{ firstname }} {{ lastname }}</h3>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const { firstname, lastname } = useAuthStore().user

const logout = () => {
  authStore.clearToken()
  router.push({ name: 'signin' })
}
</script>
