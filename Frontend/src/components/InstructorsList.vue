<template>
  <div class="container-fluid fix">
    <h1>Instructors</h1>
    <form class="d-flex" @submit.prevent="searchInstructor">
      <input
        class="form-control me-2"
        type="text"
        placeholder="Search Instructor"
        aria-label="Search"
        v-model="search"
      />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    <br />
    <div class="row">
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col" style="width: 300px">Background</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col" style="width: 200px">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(instructor, i) in instructors" :key="i">
            <td>{{ instructor.first_name }}</td>
            <td>{{ instructor.last_name }}</td>
            <td>{{ instructor.background }}</td>
            <td>{{ instructor.address }}</td>
            <td>{{ instructor.phone }}</td>
            <td>
              <button
                class="btn btn-success me-2"
                type="button"
                @click.prevent="selectInstructor(instructor)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Edit
              </button>
              <button class="btn btn-warning" @click="remove(instructor._id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <form @submit.prevent="save">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Instructor Information
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                id="close"
              >
                Close
              </button>
              <button class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let instructors = ref(null);
let search = ref(null);
let _id = ref(null);
let phone = ref(null);
let first_name = ref(null);
let last_name = ref(null);
let address = ref(null);
let background = ref(null);

onMounted(() => {
  fillArray();
});

async function fillArray() {
  let res = await fetch("http://localhost:4000/instructors/list");
  instructors.value = await res.json();
}

async function searchInstructor() {
  if (search.value == "") {
    fillArray();
  } else {
    let res = await fetch(
      `http://localhost:4000/instructors/search/${search.value}`
    );
    instructors.value = await res.json();
  }
}

function selectInstructor(instructor) {
  phone.value = instructor.phone;
  first_name.value = instructor.first_name;
  last_name.value = instructor.last_name;
  address.value = instructor.address;
  _id.value = instructor._id;
  background.value = instructor.background;
}

function save() {
  $.ajax({
    type: "PUT",
    url: `http://localhost:4000/instructors/update/${_id.value}`,
    data: JSON.stringify({
      first_name: first_name.value,
      last_name: last_name.value,
      address: address.value,
      phone: phone.value,
      background: background.value,
    }),
    headers: {
      "content-type": "application/json",
    },
    success: function (data, status) {
      if (status === "success") {
        swal("Success!", "Client Updated!", "success");
        fillArray();
      }
    },
  });
  document.getElementById("close").click();
}

function remove(id) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:4000/instructors/delete/${id}`,
    success: function (data, status) {
      if (status === "success") {
        swal("Success!", "Client Deleted!", "success");
        fillArray();
      }
    },
  });
}
</script>

<style scoped>
.fix {
  margin-top: 2%;
  width: 55%;
}
</style>