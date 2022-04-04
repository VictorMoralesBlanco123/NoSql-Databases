<template>
  <div class="container-fluid fix">
    <form class="d-flex" @submit.prevent="searchClient">
      <input
        class="form-control me-2"
        type="text"
        placeholder="Search Client"
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
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col" style="width: 200px">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, i) in clients" :key="i">
            <td>{{ client.first_name }}</td>
            <td>{{ client.last_name }}</td>
            <td>{{ client.address }}</td>
            <td>{{ client.phone }}</td>
            <td>
              <button
                class="btn btn-success me-2"
                data-toggle="modal"
                @click="selectClient(client)"
                data-target="#ClientModal"
              >
                Edit
              </button>
              <button
                class="btn btn-warning"
                @click.prevent="remove(client._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="ClientModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form @submit="save">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Client Information
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
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
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

let clients = ref(null);
let search = ref(null);
let id = ref(null);
let phone = ref(null);
let first_name = ref(null);
let last_name = ref(null);
let address = ref(null);

onMounted(async () => {
  fillArray();
});

async function fillArray() {
  let res = await fetch("http://localhost:4000/clients/list");
  clients.value = await res.json();
}

async function searchClient() {
  if (search.value == "") {
    fillArray();
  } else {
    let res = await fetch(
      `http://localhost:4000/clients/search/${search.value}`
    );
    clients.value = await res.json();
  }
}

function selectClient(client) {
  phone.value = client.phone;
  first_name.value = client.first_name;
  last_name.value = client.last_name;
  address.value = client.address;
  id.value = clients._id;
}

function remove(id) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:4000/clients/delete/${id}`,
    success: function (data, status) {
      if (status === "success") {
        swal("Success!", "Client Deleted!", "success");
        fillArray();
      }
    },
  });
  fillArray();
}
</script>

<style scoped>
.fix {
  margin-top: 2%;
  width: 55%;
}
</style>