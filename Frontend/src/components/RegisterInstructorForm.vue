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
        <textarea
          class="form-control"
          placeholder="Background and Specialities"
          rows="5"
          v-model="background"
          required
        ></textarea>
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col">
        <button type="submit" class="btn btn-primary">
          Register Instructor
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

let first_name = ref(null);
let last_name = ref(null);
let address = ref(null);
let phone = ref(null);
let background = ref(null);

function add() {
  $.ajax({
    type: "POST",
    url: "http://localhost:4000/instructors/add",
    data: JSON.stringify({
      first_name: first_name.value,
      last_name: last_name.value,
      phone: phone.value,
      address: address.value,
      background: background.value
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