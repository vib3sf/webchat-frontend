/* eslint-disable */
<script lang="ts" setup>
import { reactive, defineProps, defineEmits, ref } from "vue";

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
// eslint-disable-next-line
const emit = defineEmits<{(e: "deleteMessage"), (e: "editMessage")}>()
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
  const response = await fetch(
    `http://localhost:3000/messages/${props.message_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        content: updatedText.value,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка при изменении сообщения");
  }
  const data = await response.json();
  emit("editMessage");
  return data; // возвращаем обновленное сообщение из серверного ответа
}
async function deleteMessage() {
  await fetch(`http://localhost:3000/messages/${props.message_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user.id }),
  });
  emit("deleteMessage");
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
      <font-awesome-icon
        icon="fa-solid fa-pen"
        v-if="!editing"
        @click="editMessage"
      />
      <!-- <button v-if="!editing" @click="editMessage">edit</button> -->
      <font-awesome-icon icon="fa-solid fa-trash" @click="deleteMessage" />
      <!-- <button @click="deleteMessage">delete</button> -->
    </div>
  </div>
</template>

<style lang="sass" scoped>
.actions
  cursor: pointer
  width: fit-content
  margin-left: auto
  .fa-pen
    &:hover
      color: grey
  .fa-trash
    margin-left: 10px
    &:hover
      color: grey
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
