<template>
  <div class="container-fluid center" style="width: 75%">
    <br />
    <div class="row space-2" id="booksCol">
      <div v-for="(group, i) in groups" :key="i" class="col-4">
        <div class="card text-dark" style="width: 18rem; margin: 2%">
          <div class="card-body">
            <h5 class="card-title">{{ group.name }}</h5>
            <p class="card-text">
              Instructor: {{ group.instructor.split(",")[0] }}
            </p>
            <p class="card-text">
              Start Time: {{ toRegularTime(group.start_time) }}
            </p>
            <p class="card-text">
              End Time: {{ toRegularTime(group.end_time) }}
            </p>
            <p class="card-text">
              Schedule: <br />{{ group.schedule.toString().replace(/,/g, " ") }}
            </p>

            <button
              class="btn btn-primary m-2"
              data-toggle="modal"
              @click="edit(group)"
              data-target="#BookModal"
            >
              Join Group
            </button>
            <button
              class="btn btn-success m-2"
              data-toggle="modal"
              @click="edit(group)"
              data-target="#editGroup"
            >
              Edit Group
            </button>
            <button class="btn btn-warning" @click.prevent="remove(group._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <Edit />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Edit from "@/components/EditGroupModal.vue";

let groups = ref(null);

onMounted(() => {
  fillArray();
});

function edit() {}

async function remove(id) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:4000/groups/delete/${id}`,
    success: function (data, status) {
      if (status === "success") {
        swal("Success!", "Group Deleted!", "success");
        fillArray();
      }
    },
  });
}

function toRegularTime(time) {
  const [hours, minutes] = time.split(":");
  return `${hours > 12 ? hours - 12 : hours}:${minutes} ${
    hours >= 12 ? "PM" : "AM"
  }`;
}

async function fillArray() {
  let res = await fetch("http://localhost:4000/groups/list");
  groups.value = await res.json();
}
</script>

<style scoped>
</style>