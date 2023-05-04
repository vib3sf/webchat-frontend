/* eslint-disable */
<script lang="ts" setup>
import { reactive, defineProps, ref } from "vue";

interface Props {
  userId: string;
  userName: string;
  text: string;
  time: string;
  message_id: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const props = defineProps<Props>();
const hover = ref(true);
const editing = ref(false);
const updatedText = ref(" ");
const user = reactive<User>(JSON.parse(localStorage.getItem("user") || "{}"));
function checkMessage(): string {
  return props.userId === user.id ? "your-message" : "other-message";
}
function editMessage() {
  editing.value = true;
  updatedText.value = props.text;
}
async function updateMessage() {
  const response = await fetch("http://localhost:3000/update_message", {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      message_id: props.message_id,
      сontent: updatedText.value,
    }),
  });
  if (!response.ok) {
    throw new Error("Ошибка при изменении сообщения");
  }
  const data = await response.json();
  return data; // возвращаем обновленное сообщение из серверного ответа
}
async function deleteMessage() {
  await fetch("http://localhost:3000/destroy_message", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user.id, message_id: props.message_id }),
  });
}
</script>

<template>
  <div
    :class="checkMessage()"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="name" v-if="userId !== user.id">
      {{ userName }}
    </div>
    <div v-if="editing">
      <input v-model="updatedText" type="text" />
      <button @click="updateMessage">Применить</button>
    </div>
    <p class="text" v-else>{{ text }}</p>
    <p class="time">
      <timeago :datetime="time"></timeago>
    </p>
    <div class="actions" v-if="hover && userId === user.id">
      <button v-if="!editing" @click="editMessage">edit</button>
      <button @click="deleteMessage">delete</button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.other-message
  background-color: #F2F2F7
  width: fit-content
  max-width: 400px
  height: fit-content
  color: #000000
  border-radius: 0 15px 15px 15px
  padding: 5px
  margin-right: auto
  margin-left: 20px
  margin-bottom: 20px

  .name
    font-weight: bold
    margin-bottom: 10px
    padding-left: 5px

  .text
    margin: 0
    padding-left: 5px
    margin-bottom: 5px
    margin-right: 50px

  .time
    margin: 0
    text-align: right
    padding-right: 4px

.your-message
  background-color: #007AFF
  width: fit-content
  max-width: 400px
  height: fit-content
  color: #ffffff
  border-radius: 15px 0 15px 15px
  padding: 5px
  margin-left: auto
  margin-right: 20px
  margin-bottom: 20px

  .text
    margin: 0
    padding-left: 5px
    margin-bottom: 5px
    margin-right: 50px

  .time
    margin: 0
    text-align: right
    padding-right: 4px
</style>
