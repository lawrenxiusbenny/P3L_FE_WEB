<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
tbody tr:hover td {
  background-color: rgba(255, 80, 91, .1);
}
</style>
