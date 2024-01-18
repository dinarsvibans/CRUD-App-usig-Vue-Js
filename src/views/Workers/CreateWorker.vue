<template>
  <div class="container formContainer">
    <div class="card">
      <div class="card-header">
        <h3>Register new employee</h3>
      </div>
      <div class="card-body">
        <form @submit="postWrker">
          <div class="mb-3">
            <label for="">First name</label>
            <input type="text" v-model="model.firstName" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="">Last Name</label>
            <input type="text" v-model="model.lastName" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="">Email</label>
            <input type="text" v-model="model.email" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="">Position</label>
            <input type="text" v-model="model.position" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="">Add profile picture</label>
            <input
              type="file"
              @change="handleFileChange"
              class="form-control"
              accept="image/jpeg, image/png, image/jpg"
            />
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { Worker } from '../../components/WorkerType'

const model = ref<Worker>({
  firstName: '',
  lastName: '',
  email: '',
  position: '',
  isCheckedIn: false,
  profilePicture: '',
  comments: [],
  workFlow: {
    startedAt: 0,
    finishedAt: 0,
    hoursToday: 0,
    hoursThisMonth: 0
  }
})

const postWrker = () => {
  axios
    .post('http://localhost:3000/workers', model.value)
    .then((res) => {
      model.value = {
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        profilePicture: '',
        comments: [],
        isCheckedIn: false,
        workFlow: {
          startedAt: 0,
          finishedAt: 0,
          hoursToday: 0,
          hoursThisMonth: 0
        }
      }
      console.log(res)
    })
    .catch((error) => {
      console.error('Error posting worker:', error)
    })
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataURL = event.target?.result as string
      model.value.profilePicture = dataURL
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style>
.formContainer {
  max-width: 600px;
}
</style>
