<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <carousel id="carousel" /><br>
        <h1>Gym Management System</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import carousel from "@/components/Carousel.vue";
</script>

<style scoped>
#carousel {
width: 75%;
margin-top: 2%;
margin-left: auto;
margin-right: auto;
}
</style>