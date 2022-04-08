<template>
  <div class="container-fluid center" style="width: 75%">
    <br />
    <div class="row space-2" id="booksCol">
      <div v-for="(group, i) in groups" :key="i" class="col-4">
        <div class="card text-dark" style="width: 18rem; margin: 2%">
          <div class="card-body">
            <h5 class="card-title">{{ group.name }}</h5>
            <p class="card-text">Instructor: {{ group.instructor.split(',')[0] }}</p>
            <p class="card-text">Start Time: {{ group.start_time }}</p>
            <p class="card-text">End Time: {{ group.end_time }}</p>
            <p class="card-text">
              Schedule: <br />{{ group.schedule.toString().replace(/,/g, " ") }}
            </p>

            <button
              class="btn btn-success m-2"
              data-toggle="modal"
              @click="edit(group)"
              data-target="#BookModal"
            >
              Edit
            </button>
            <button class="btn btn-warning" @click="remove(group._id)">
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

let groups = ref(null);

onMounted(() => {
  fillArray();
});

async function fillArray() {
  let res = await fetch("http://localhost:4000/groups/list");
  groups.value = await res.json();
}
</script>

<style scoped>
</style>