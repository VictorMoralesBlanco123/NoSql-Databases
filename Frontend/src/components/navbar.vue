<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand white" to="/">Home</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink class="nav-link white" to="#" >Home</RouterLink>
          <RouterLink class="nav-link white" to="#">Features</RouterLink>
          <RouterLink class="nav-link white" to="#">Pricing</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>


</style>