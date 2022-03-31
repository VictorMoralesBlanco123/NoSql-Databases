<template>
  <div class="fixMargins">
    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="First Name"
          required
        />
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Last Name"
          required
        />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Address"
          required
        />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col">
        <input
          type="tel"
          class="form-control"
          placeholder="Phone Number"
          minlength="12"
          maxlength="12"
          ref="phone"
          pattern="[0-9\-]"
          @change="check"
          required
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let phone = ref(null);

function check(e) {
  if (
    event.key != "Backspace" &&
    (phone.value.length === 3 || phone.value.length === 7)
  ) {
    phone.value += "-";
  }
}
</script>

<style scoped>
.fixMargins {
  width: 50% !important;
  margin-right: auto;
  margin-left: auto;
}
</style>