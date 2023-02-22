<template>
  <router-view/>
</template>

<script>
import { useRouter } from 'vue-router'
import useAuth from './modules/auth/composables/useAuth'
export default {
  setup() {
    const router = useRouter()
    const { checkAuthStatus, authStatus } = useAuth()

    checkAuthStatus();

    if(authStatus==="no-authenticated") router.push({name:"login"})

    return {
      authStatus,
    }
  },
}
</script>

<style scoped>

</style>