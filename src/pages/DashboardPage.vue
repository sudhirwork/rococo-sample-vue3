<template>
  <q-page class="flex flex-center bg-grey-2">
    <!-- <q-card> -->
    <!-- <q-card-section> -->
    <span class="text-h6 text-center">Hi {{ firstname }} {{ lastname }}</span>
    <!-- </q-card-section> -->
    <!-- </q-card> -->
  </q-page>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth'
const { firstname, lastname } = useAuthStore().user
</script>
