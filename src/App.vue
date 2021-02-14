<template>
  <v-app style="background-color: lightgray">
    <app-start-page></app-start-page>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppStartPage from './components/AppStartPage.vue';

export default Vue.extend({
    name: 'App',
    components: { AppStartPage }
});
</script>
