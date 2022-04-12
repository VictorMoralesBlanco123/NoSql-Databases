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

        <div class="alert alert-warning" id="checkAlert">
          There are no members currently in this goup.
        </div>
        <br />
        <div class="row">
          <div class="col center">
            <RouterLink
              type="button"
              class="btn btn-secondary m-2"
              to="/listgroups"
              @click="removeLocal"
              >Return</RouterLink
            >

            <button class="btn btn-primary">Add Member</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
let group = ref(null);

let clients = ref([]);
let groupID = ref(null);
let members = ref([]);

onMounted(() => {
  group.value = JSON.parse(localStorage.getItem("group"));
  groupID.value = group.value._id;
  members.value = group.value.members;
  fillArray();
  checkArray();
});

function removeLocal() {
  localStorage.removeItem("group");
}

async function checkArray() {
  if (members.value.length == 0) {
    document.getElementById("checkAlert").hidden = false;
  } else {
    document.getElementById("checkAlert").hidden = true;
  }
}

async function fillArray() {
  let res3 = await fetch("http://localhost:4000/clients/list");
  clients.value = await res3.json();
}

function triggerAlert(name) {
  swal("Hold up!", `${name} is already a member of this group`, "info");
}

function triggerAlert2(name) {
  swal(
    "Error!",
    `${name} is not registered as as a client in our system. Please verify spelling and capitalize the client's name.`,
    "error"
  );
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
          }
        },
      });

      fillArray();
      checkArray();
      group.value.members = members.value;
      localStorage.setItem("group", JSON.stringify(group.value));

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
      }
    },
  });

  fillArray();
  checkArray();

  group.value.members = members.value;
  localStorage.setItem("group", JSON.stringify(group.value));
}
</script>

<style scoped>
.fixMargins {
  width: 50% !important;
  margin-right: auto;
  margin-left: auto;
}
</style>