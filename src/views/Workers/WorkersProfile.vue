<template>
  <h2 class="text-white text-center" v-if="worker">{{ worker.firstName }} Work information</h2>
  <div class="container profileContainer bg-light mx-auto p-4">
    <div class="row" v-if="worker">
      <div class="col-8">
        <table class="table table-light table-striped">
          <tbody>
            <tr>
              <th scope="row">Employee ID</th>
              <td>{{ worker.id }}</td>
            </tr>
            <tr>
              <th scope="row">Name</th>
              <td>{{ worker.firstName }}</td>
            </tr>
            <tr>
              <th scope="row">Last Name</th>
              <td>{{ worker.lastName }}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{{ worker.email }}</td>
            </tr>
            <tr>
              <th scope="row">Position</th>
              <td>{{ worker.position }}</td>
            </tr>
            <tr>
              <th scope="row">Last checkIn</th>
              <td>{{ LocalDate(worker.workFlow.startedAt) }}</td>
            </tr>
            <tr>
              <th scope="row">Last checkOut</th>
              <td>
                <p v-if="!worker.workFlow.finishedAt && !worker.workFlow.startedAt">
                  Has never worked
                </p>
                <p v-else-if="!worker.workFlow.finishedAt">Currently working</p>
                <p v-else>{{ LocalDate(worker.workFlow.finishedAt) }}</p>
              </td>
            </tr>
            <tr>
              <th scope="row">Time worked today</th>
              <td>
                <p v-if="worker.workFlow.startedAt && !worker.workFlow.finishedAt">
                  Currently Working
                </p>
                <p v-else>
                  <TimeComponent v-if="worker?.workFlow" :fixedTime="worker.workFlow.hoursToday" />
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">Time worked this month</th>
              <td v-if="worker.workFlow.hoursThisMonth">
                <TimeComponent
                  v-if="worker?.workFlow"
                  :fixedTime="worker.workFlow.hoursThisMonth"
                />
              </td>
              <td v-else>0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-4 imageWrapper">
        <i class="bi bi-gear-fill profileSettings" @click="showForm = !showForm"></i>

        <EditForm
          :initialName="worker.firstName"
          :initialLastName="worker.lastName"
          :initialEmail="worker.email"
          :initialPosition="worker.position"
          class="editForm"
          @editSubmitted="handelProfileEdit"
          v-if="showForm"
        />
        <img class="ProfilePicture" :src="worker.profilePicture" alt="Profile picture" />
      </div>
    </div>
    <div v-else>Loading...</div>
    <hr />
    <div class="row comment-section">
      <div class="col-12">
        <h3>
          Here you can make anonymous comment about colleague's work .
          <span class="commentCativeTime"></span>
        </h3>
        <div class="row">
          <div class="col-8 mx-auto">
            <form @submit.prevent="postComment">
              <textarea
                class="textArea"
                placeholder="Leave a comment"
                v-model="workerComment"
              ></textarea>
            </form>
          </div>
          <div class="col-4" justify-content-start>
            <button type="button" class="btn btn-primary" @click="postComment">Submit</button>
          </div>
        </div>
        <div div class="card mx-auto p-4" style="width: 100%">
          <h4>Latest comments</h4>
          <hr />
          <div class="comments">
            <p class="comment" v-for="comment in worker?.comments" :key="comment">
              {{ comment }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { Worker } from '../../components/WorkerType'
import { LocalDate } from '@/components/LocalTime'
import TimeComponent from '@/components/HoursWorked.vue'
import EditForm from '@/components/EditForm.vue'

const route = useRoute()
const worker = ref<Worker>()
const showForm = ref(false)
const workerComment = ref('')

console.log(workerComment)

const postComment = async () => {
  try {
    const updatedWorker = {
      ...worker.value,
      comments: [...(worker.value?.comments || []), workerComment.value]
    }
    await axios.put(`http://localhost:3000/workers/${route.params.id}`, updatedWorker)
    worker.value?.comments.push(workerComment.value)
    workerComment.value = ''
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/workers/${route.params.id}`)
    worker.value = res.data
  } catch (error) {
    console.log(error)
  }
})

interface SubmittedData {
  ediName: string
  editLastName: string
  editEmail: string
  editPosition: string
}
const handelProfileEdit = async (submittedData: SubmittedData) => {
  console.log('data', submittedData)

  try {
    const updatedWorker = {
      ...worker.value,
      firstName: submittedData.ediName,
      lastName: submittedData.editLastName,
      email: submittedData.editEmail,
      position: submittedData.editPosition
    }

    await axios.put(`http://localhost:3000/workers/${route.params.id}`, updatedWorker)

    worker.value = updatedWorker

    showForm.value = false
  } catch (error) {
    console.error('Error updating worker:', error)
  }
}
</script>

<style>
.ProfilePicture {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
}

.splitProfile {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.commentCativeTime {
  font-size: 12px;
}

.profileName {
  font-size: 16px;
}

.textArea {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid rgb(202, 200, 200);
  border-radius: 10px;
}

.comments {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.comment {
  background-color: rgb(206, 206, 206);
  padding: 5px 15px;
  width: fit-content;
  border-radius: 10px;
}

.profileContainer {
  border-radius: 20px;
  margin-bottom: 70px;
  margin-top: 30px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 1);
}

.comment-section {
  margin-top: 100px;
}

.imageWrapper {
  position: relative;
}
.profileSettings {
  font-size: 2em;
  position: absolute;
  inset: 10px 30px;
  cursor: pointer;
}
.profileSettings:hover {
  color: blue;
}

.editForm {
  position: absolute;
  background-color: rgb(255, 138, 138);
  padding: 30px;
  border-radius: 20px;
  top: 70%;
  left: 50%;
  background-color: rgb(75, 33, 33);
  z-index: 3;
  width: 400px;
  transform: translate(-50%, -50%);
}
</style>
