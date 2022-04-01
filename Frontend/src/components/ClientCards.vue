<template>
  <div class="container-fluid fix">
    <form class="d-flex" @submit="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
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
                v-on:click="Edit(client._id)"
                data-target="#BookModal"
              >
                Edit
              </button>
              <button class="btn btn-warning" v-on:click="Delete(client._id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let clients = ref(null);
let search = ref(null);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/clients/list");
  clients.value = await res.json();
});

function search(){
    
}
</script>

<style scoped>
.fix {
  margin-top: 2%;
  width: 55%;
}
</style>