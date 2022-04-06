<template>
  <form @submit.prevent="add">
    <div class="row fixMargins">
      <div class="col">
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="Group Name"
        />
      </div>
    </div>

    <br />

    <div class="row fixMargins">
      <div class="col">
        <select class="form-select" id="instructor" required>
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
        <label>Start Date</label>
        <input
          type="date"
          @change="checkDate"
          v-model="start_date"
          class="form-control"
          required
        />
      </div>
      <div class="col">
        <label>End Date</label>
        <input
          type="date"
          @change="checkDate"
          v-model="end_date"
          class="form-control"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Groups must be at least one month long"
        />
      </div>
    </div>

    <br />

    <div class="row" id="daySelecor">
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
      <div class="col">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
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
let start_date = ref(null);
let end_date = ref(null);

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

onMounted(() => {
  fillArray();
  checkDate();
});

async function checkDate() {
  today = yyyy + "-" + mm + "-" + dd;
  if (start_date.value == "" || new Date(start_date.value) < new Date(today)) {
    start_date.value = today;
  }
  if (
    end_date.value == "" ||
    new Date(end_date.value) < new Date(start_date.value)
  ) {
    let x = new Date();
    let day = String(x.getDate()).padStart(2, "0");
    let month = String(x.getMonth() + 2).padStart(2, "0");
    let year = x.getFullYear();
    x = year + "-" + month + "-" + day;
    end_date.value = x;
  }
}

function add() {
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

.daySelecor{
  
}
</style>