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
              type="button"
              data-toggle="modal"
              @click="setUpJoin(group)"
              data-bs-toggle="modal"
              data-bs-target="#JoinGroup"
            >
              Join Group
            </button>
            <button
              class="btn btn-success m-2"
              type="button"
              @click.prevent="setUpEdit(group)"
              data-bs-toggle="modal"
              data-bs-target="#editGroup"
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

    <form @submit.prevent="save">
      <div
        class="modal fade"
        id="editGroup"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
                  <select
                    class="form-select"
                    @change="select"
                    id="instructorSelect"
                    required
                  >
                    <option selected value="">Select Instructor</option>
                    <option
                      v-for="(instructor, i) in instructors"
                      :key="i"
                      :value="[
                        instructor.first_name + ' ' + instructor.last_name,
                        instructor._id,
                      ]"
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
                  <input
                    type="time"
                    v-model="start_time"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col">
                  <label>End Time</label>
                  <input
                    type="time"
                    v-model="end_time"
                    class="form-control"
                    required
                  />
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
                      id="Monday"
                    />

                    <label class="form-check-label" for="monday">
                      Monday
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Tuesday"
                      id="Tuesday"
                    />

                    <label class="form-check-label" for="tuesday">
                      Tuesday
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Wednesday"
                      id="Wednesday"
                    />

                    <label class="form-check-label" for="wednesday">
                      Wednesday
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Thursday"
                      id="Thursday"
                    />

                    <label class="form-check-label" for="thursday">
                      Thursday
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Friday"
                      id="Friday"
                    />

                    <label class="form-check-label" for="friday">
                      Friday
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Saturday"
                      id="Saturday"
                    />

                    <label class="form-check-label" for="saturday">
                      Saturday
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Sunday"
                      id="Sunday"
                    />

                    <label class="form-check-label" for="sunday">
                      Sunday
                    </label>
                  </div>
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
      </div>
    </form>

    <form @submit.prevent="join">
      <div
        class="modal fade"
        id="JoinGroup"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Join Group</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                class="form-control"
                id="JoinClient"
                placeholder="Add Client"
                required
              />
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
                      <button class="btn btn-danger" @click="removeMember(i)">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button class="btn btn-primary">Add Member</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let groups = ref(null);
let instructors = ref(null);

let name = ref(null);
let start_time = ref(null);
let end_time = ref(null);
let instructor = ref(null);
let schedule = ref([]);
let id = ref(null);

let clients = ref(null);
let groupID = ref(null);
let members = ref([]);

onMounted(() => {
  fillArray();
});

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

function setUpJoin(group) {
  groupID.value = group._id;
  members.value = group.members;
}

function triggerAlert(name) {
  swal("Hold up!", `${name} is already a member of this group`, "info");
}

function join() {
  let bool = false;

  for (let i = 0; i < members.value.length; i++) {
    if (
      members.value[i] ==
      document.getElementById("JoinClient").value.trim().replace(/\s+/g, " ")
    ) {
      bool = true;
      break;
    }
  }

  if (bool == true) {
    triggerAlert(
      document.getElementById("JoinClient").value.trim().replace(/\s+/g, " ")
    );
    return;
  }

  for (let i = 0; i < clients.value.length; i++) {
    if (
      clients.value[i].first_name + " " + clients.value[i].last_name ==
      document.getElementById("JoinClient").value
    ) {
      members.value.push(
        document.getElementById("JoinClient").value.trim().replace(/\s+/g, " ")
      );
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
  }
}

function save() {
  let days = [];

  if (document.getElementById("Monday").checked == true) {
    days.push("Monday");
  }
  if (document.getElementById("Tuesday").checked == true) {
    days.push("Tuesday");
  }
  if (document.getElementById("Wednesday").checked == true) {
    days.push("Wednesday");
  }
  if (document.getElementById("Thursday").checked == true) {
    days.push("Thursday");
  }
  if (document.getElementById("Friday").checked == true) {
    days.push("Friday");
  }
  if (document.getElementById("Saturday").checked == true) {
    days.push("Saturday");
  }
  if (document.getElementById("Sunday").checked == true) {
    days.push("Sunday");
  }

  if (days.length == 0) {
    return;
  }

  $.ajax({
    type: "PUT",
    url: `http://localhost:4000/groups/update/${id.value}`,
    data: JSON.stringify({
      name: name.value,
      instructor: instructor.value,
      start_time: start_time.value,
      end_time: end_time.value,
      schedule: days,
    }),
    headers: {
      "content-type": "application/json",
    },
    success: function (data, status) {
      if (status === "success") {
        swal("Success!", "Group Updated!", "success");
        fillArray();
      }
    },
  });
  document.getElementById("close").click();
}

function setUpEdit(group) {
  id.value = group._id;
  name.value = group.name;
  start_time.value = group.start_time;
  end_time.value = group.end_time;
  instructor.value = group.instructor;
  document.getElementById("instructorSelect").value = group.instructor;
  schedule.value = group.schedule;
  for (let i = 0; i < schedule.value.length; i++) {
    document.getElementById(`${schedule.value[i]}`).checked = true;
  }
}

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
  let res2 = await fetch("http://localhost:4000/instructors/list");
  instructors.value = await res2.json();
  let res3 = await fetch("http://localhost:4000/clients/list");
  clients.value = await res3.json();
}
</script>

<style scoped>
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