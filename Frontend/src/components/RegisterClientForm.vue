<template>
  <form class="fixMargins" @submit.prevent="add">
    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="First Name"
          pattern="[A-aZ-z]+"
          v-model="first_name"
          required
        />
      </div>

      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Last Name"
          pattern="[A-aZ-z]+"
          v-model="last_name"
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
          v-model="address"
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
          placeholder="Phone Number (Ex.239-239-1231)"
          minlength="12"
          maxlength="12"
          v-model="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
        />
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col">
        <button type="submit" class="btn btn-primary">Register Client</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

let phone = ref(null);
let first_name = ref(null);
let last_name = ref(null);
let address = ref(null);

function add() {
  $.ajax({
    type: "POST",
    url: "http://localhost:4000/clients/add",
    data: JSON.stringify({
      name: first_name.value + " " + last_name.value,
      phone: phone.value,
      address: address.value,
    }),
    headers: {
      "content-type": "application/json",
    },
    success: function (data, status) {
      if (status === "success") {
        swal("Success!", "Client Registered!", "success");
        document.querySelector("form").reset();
      }
    },
  });
}
</script>

<style scoped>
.fixMargins {
  width: 50% !important;
  margin-right: auto;
  margin-left: auto;
}
</style>