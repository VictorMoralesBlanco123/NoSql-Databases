<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
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

.page-container {
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: 2.5rem;
}

.white {
  color: white !important;
}

h1 {
  text-align: center;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  text-align: center;
  color: white;
  background-color: #161616 !important;
}

#contain {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}

.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

#divTable {
  width: 70%;
  margin-top: 1%;
}
</style>
