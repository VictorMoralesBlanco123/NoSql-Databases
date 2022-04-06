<template>
  <form @submit.prevent="add">
    <div class="row fixMargins">
      <div class="col">
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="Group Name"
          required
        />
      </div>
    </div>

    <br />

    <div class="row fixMargins">
      <div class="col">
        <select class="form-select" @change="select" id="instructor" required>
          <option selected value="">Select Instructor</option>
          <option
            v-for="(instructor, i) in instructors"
            :key="i"
            :value="instructor._id"
          >
            {{ instructor.first_name + " " + instructor.last_name }}
          </option>
        </select>
      </div>
    </div>

    <br />

    <div class="row fixMargins">
      <div class="col">
        <label>Start Time</label>
        <input type="time" v-model="start_time" class="form-control" required />
      </div>
      <div class="col">
        <label>End Time</label>
        <input type="time" v-model="end_time" class="form-control" />
      </div>
    </div>

    <br />

    <div class="row" id="daySelector">
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Monday"
            id="monday"
          />

          <label class="form-check-label" for="monday"> Monday </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Tuesday"
            id="tuesday"
          />

          <label class="form-check-label" for="tuesday"> Tuesday </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Wednesday"
            id="wednesday"
          />

          <label class="form-check-label" for="wednesday"> Wednesday </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Thursday"
            id="thursday"
          />

          <label class="form-check-label" for="thursday"> Thursday </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Friday"
            id="friday"
          />

          <label class="form-check-label" for="friday"> Friday </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Saturday"
            id="saturday"
          />

          <label class="form-check-label" for="saturday"> Saturday </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Sunday"
            id="sunday"
          />

          <label class="form-check-label" for="sunday"> Sunday </label>
        </div>
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col">
        <button type="submit" class="btn btn-primary">Register Group</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";

let name = ref(null);
let instructors = ref(null);
let start_time = ref(null);
let end_time = ref(null);
let instructor = ref(null);
let schedule = ref([]);

onMounted(() => {
  fillArray();
});

function add() {
  checkDays();
  $.ajax({
    type: "POST",
    url: "http://localhost:4000/groups/add",
    data: JSON.stringify({
      first_name: first_name.value,
      last_name: last_name.value,
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

function checkDays() {
  if(document.getElementById("monday").checked == true){

  }
}

function select() {
  instructor.value = document.getElementById("instructor").value;
}

async function fillArray() {
  let res = await fetch("http://localhost:4000/instructors/list");
  instructors.value = await res.json();
}
</script>

<style scoped>
.fixMargins {
  width: 25% !important;
  margin-right: auto;
  margin-left: auto;
}

#daySelector {
  text-align: center;
  width: 70%;
  margin-right: auto;
  margin-left: auto;
  background-color: rgb(241, 241, 241);
  padding: 1%;
  border-radius: 10px;
}
</style>