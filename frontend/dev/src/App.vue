<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import UserService from './services/user.service';

export default {
  name: 'App',
  created() {
    UserService.getMe()
      .then((resp) => {
        if (['auth', 'refresh'].includes(resp)) {
          if (resp === 'auth' && this.$route.path !== '/login') {
            this.$router.push('/login');
          }
        }
      });
  },
};
</script>

<style>
</style>
