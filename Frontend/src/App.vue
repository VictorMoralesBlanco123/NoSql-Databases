<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="page-container">
    <Navbar />

    <div class="content-wrap">
      <RouterView />
    </div>

    <footer class="footer">
      <Footer />
    </footer>
  </div>
</template>

<style>
@import "@/assets/base.css";

</style>
