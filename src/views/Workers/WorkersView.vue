<template>
  <div class="container">
    <h2 class="text-center p-3 text-white">Registered employees</h2>
    <div class="card">
      <div class="cared-header bg-secondary p-2">
        <RouterLink to="workers/create" class="btn btn-primary float-start"
          >Register new employee</RouterLink
        >
      </div>
      <div class="card-body bg-dark">
        <table class="table table-dark table-striped">
          <thead>
            <th><h5>Employee Id</h5></th>
            <th><h5>Full Name</h5></th>
            <th><h5>status</h5></th>
            <th><h5>Last Check In</h5></th>
            <th><h5>Last Check Out</h5></th>
            <th><h5>Check In / Out</h5></th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="(worker, index) in allWorkers" :key="index">
              <td class="align-middle text-center">{{ worker.id }}</td>
              <td class="align-middle text-center">{{ worker.firstName }} {{ worker.lastName }}</td>
              <td class="align-middle text-center">
                <span v-if="worker.workFlow.startedAt && !worker.workFlow.finishedAt">
                  <i class="bi bi-check-circle-fill text-success"></i>
                </span>
                <span v-else>
                  <i class="bi bi-x-circle-fill text-danger"></i>
                </span>
              </td>
              <td class="align-middle text-center">
                <span v-if="worker.workFlow.startedAt">{{
                  LocalDate(worker.workFlow.startedAt)
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span v-if="!worker.workFlow.finishedAt && worker.workFlow.startedAt">
                  Working
                </span>
                <span v-else-if="!worker.workFlow.finishedAt"></span>
                <span v-else>{{ LocalDate(worker.workFlow.finishedAt) }}</span>
              </td>

              <td class="d-flex justify-content-between">
                <button
                  class="btn btn-success"
                  v-if="!worker.workFlow.startedAt"
                  @click="checkIn(worker.id)"
                >
                  Check In
                </button>
                <button
                  class="btn btn-success"
                  v-else-if="worker.workFlow.startedAt && worker.workFlow.finishedAt"
                  @click="checkIn(worker.id)"
                >
                  Check In
                </button>
                <button class="btn btn-danger" v-else @click="checkOut(worker.id)">
                  Check Out
                </button>
                <RouterLink :to="{ path: `workers/${worker.id}` }" class="btn btn-light"
                  >View Profile</RouterLink
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { Worker } from '../../components/WorkerType'
import { LocalDate } from '@/components/LocalTime'

const allWorkers = ref<Worker[]>([])
console.log('allWorkers', allWorkers)
const getWorkers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/workers')
    allWorkers.value = response.data
  } catch (error) {
    console.error('Error fetching workers:', error)
  }
}
const checkIn = async (id: string | undefined) => {
  if (id) {
    try {
      const currentWorker = allWorkers.value.find((worker) => worker.id === id)
      if (currentWorker) {
        currentWorker.workFlow.startedAt = new Date().getTime()
        currentWorker.workFlow.finishedAt = 0

        await axios.put(`http://localhost:3000/workers/${id}`, currentWorker)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const checkOut = async (id: string | undefined) => {
  if (id) {
    try {
      const currentWorker = allWorkers.value.find((worker) => worker.id === id)
      if (currentWorker) {
        currentWorker.workFlow.finishedAt = new Date().getTime()
        const timeWorked = currentWorker.workFlow.finishedAt - currentWorker.workFlow.startedAt

        currentWorker.workFlow.hoursToday += timeWorked
        currentWorker.workFlow.hoursThisMonth += timeWorked
        await axios.put(`http://localhost:3000/workers/${id}`, currentWorker)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

onMounted(getWorkers)
</script>
