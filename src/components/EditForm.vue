<template>
  <div>
    <h3 class="text-white">Change profile info</h3>
    <form @submit.prevent="submitEdit">
      <div class="labelInput text-white">
        <label for="ediName">Change name</label>
        <input type="text" id="ediName" v-model="ediName" />
      </div>
      <div class="labelInput text-white">
        <label for="editLastName">Change last name</label>
        <input type="text" id="editLastName" v-model="editLastName" />
      </div>
      <div class="labelInput text-white">
        <label for="editEmail">Change email</label>
        <input type="text" id="editEmail" v-model="editEmail" />
      </div>
      <div class="labelInput text-white">
        <label for="editPosition">Change position</label>
        <input type="text" id="editPosition" v-model="editPosition" />
      </div>

      <button class="btn btn-light submitButton">Sumbit</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'
const props = defineProps(['editProfile','initialName', 'initialLastName', 'initialEmail','initialPosition'])
const emit = defineEmits(['editSubmitted'])
const ediName = ref(props.initialName)
const editLastName = ref(props.initialLastName)
const editEmail = ref(props.initialEmail)
const editPosition = ref(props.initialPosition)

const submitEdit = () => {
  console.log('submitted')

  const submittedData = {
    ediName: ediName.value,
    editLastName: editLastName.value,
    editEmail: editEmail.value,
    editPosition: editPosition.value
  }

  emit('editSubmitted', submittedData)
}
</script>

<style>
.labelInput {
  display: flex;
  flex-direction: column;
}

.submitButton {
  margin-top: 20px;
}
</style>
