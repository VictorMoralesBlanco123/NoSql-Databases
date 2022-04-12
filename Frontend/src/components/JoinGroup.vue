<template>
  <div class="container-fluid">
    <form @submit.prevent="join">
      <br />

      <div class="row fixMargins">
        <div class="col">
          <input
            type="text"
            class="form-control"
            id="JoinClient"
            placeholder="Add Client"
            required
          />
        </div>
        <br />
        <br />
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th>Members</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, i) in members" :key="i">
              <td>{{ member }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="removeMember(i)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="row">
          <div class="col center">
            <button type="button" class="btn btn-secondary m-2">Return</button>

            <button class="btn btn-primary">Add Member</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
let clients = ref(null);
let groupID = ref(null);
let members = ref([]);

onMounted(() => {
  let group = JSON.parse(localStorage.getItem("group"));
  groupID.value = group._id;
  members.value = group.members;
  fillArray();
});

async function fillArray() {
  let res3 = await fetch("http://localhost:4000/clients/list");
  clients.value = await res3.json();
}

function triggerAlert(name) {
  swal("Hold up!", `${name} is already a member of this group`, "info");
}

function triggerAlert2(name) {
  swal("Error!", `${name} is not registered as as a client in our system. Please verify spelling and capitalize the client's name.`, "error");
}

function join() {
  let bool = false;
  let text = document
    .getElementById("JoinClient")
    .value.trim()
    .replace(/\s+/g, " ");

  for (let i = 0; i < members.value.length; i++) {
    if (members.value[i] == text) {
      bool = true;
      break;
    }
  }

  if (bool == true) {
    triggerAlert(text);
    return;
  }

  for (let i = 0; i < clients.value.length; i++) {
    if (
      clients.value[i].first_name + " " + clients.value[i].last_name ==
      text
    ) {
      members.value.push(text);

      $.ajax({
        type: "PUT",
        url: `http://localhost:4000/groups/update/${groupID.value}`,
        data: JSON.stringify({
          members: members.value,
        }),
        headers: {
          "content-type": "application/json",
        },
        success: function (data, status) {
          if (status === "success") {
            swal("Success!", "Member Added!", "success");
            fillArray();
          }
        },
      });
      break;
    }

    if (
      i == clients.value.length - 1 &&
      clients.value[i].first_name + " " + clients.value[i].last_name != text
    ) {
      triggerAlert2(text);
    }
  }
}

function removeMember(member) {
  members.value.splice(member, 1);
  $.ajax({
    type: "PUT",
    url: `http://localhost:4000/groups/update/${groupID.value}`,
    data: JSON.stringify({
      members: members.value,
    }),
    headers: {
      "content-type": "application/json",
    },
    success: function (data, status) {
      if (status === "success") {
        swal("Success!", "Member Removed!", "success");
        fillArray();
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