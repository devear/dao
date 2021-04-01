<template>
  <v-app>
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  name: 'App',

  computed: {
    layout(){
      return (this.$route.meta.layout || 'Empty') + 'Layout'
    }
  },

  components: {
    EmptyLayout, MainLayout
  },

  data: () => ({
    
  }),
};
</script>
<style>
@import '~materialize-css/dist/css/materialize.min.css';
</style>