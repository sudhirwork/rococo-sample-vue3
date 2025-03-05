import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : {
          email: null,
          firstname: null,
          lastname: null,
        },
    token: localStorage.getItem('authToken') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    // setToken(token) {
    //   this.token = token
    //   localStorage.setItem('authToken', token)
    // },
    clearToken() {
      this.token = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
    },
    setData({ user, token }) {
      this.user = user
      this.token = token
      localStorage.setItem('authToken', token)
      localStorage.setItem('userData', JSON.stringify(user))
    },
    async verifyToken() {
      const router = useRouter()

      if (!this.token) {
        router.replace({ name: 'signin' }) // Redirect if no token
        return false
      }

      try {
        const response = await axios.post(
          `${BACKEND_URL}/verify-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        )

        if (response.status !== 200) {
          throw new Error('Invalid Token')
        }

        return true
      } catch (error) {
        console.error('Token verification failed:', error)
        this.clearToken()
        router.replace({ name: 'signin' })
        return false
      }
    },
  },
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
// }
