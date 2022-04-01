<template>
  <div class="col">
    <div class="row space-2" id="booksCol">
      <div v-for="(client, i) in clients" :key="i" class="col-4">
        <div class="card text-dark" style="width: 18rem; margin: 2%">
          <div class="card-body">
            <p class="card-title">
              Name: {{ client.first_name + " " + client.last_name }}
            </p>
            <p class="card-text">Address: {{ client.address }}</p>
            <p class="card-text">Phone Number: {{ client.phone }}</p>

            <button
              class="btn btn-success"
              data-toggle="modal"
              v-on:click="Edit(client._id)"
              data-target="#BookModal"
            >
              Edit
            </button>
            <button
              class="btn btn-warning"
              v-on:click="deleteBook(book.book_id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let clients = ref(null);

onMounted(() => {
  fillArray();
});

async function fillArray() {
  let res = await fetch("http://localhost:4000/clients/list");
  clients.value = await res.json();
}
</script>

<style scoped>
</style>