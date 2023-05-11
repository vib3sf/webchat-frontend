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
const emit = defineEmits<{(e: "deleteMessage"), (e: "editMessage")}>() // определяем события из родительского компонента
const hover = ref(true);
const editing = ref(false);
const updatedText = ref(" ");
const user = reactive<User>(JSON.parse(localStorage.getItem("user") || "{}")); // reactive - тот же ref, только для объектов
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
    <!-- Событие прио тведении и наведении мышки -->
    <div class="name" v-if="userId !== user.id">
      {{ userName }}
    </div>
    <!-- {{}} - вставка переменной JS в верстку -->
    <!-- v-if - при каком условии отрисуется элемент -->
    <div v-if="editing">
      <!-- v-model - в какую перменную будут записываться данные из input -->
      <input v-model="updatedText" type="text" />
      <button @click="updateMessage">Применить</button>
    </div>
    <p class="text">{{ text }}</p>
    <p class="time">
      <timeago :datetime="time"></timeago>
    </p>
    <div class="actions" v-if="hover && userId === user.id">
      <font-awesome-icon
        icon="fa-solid fa-pen"
        v-if="!editing"
        @click="editMessage"
      />
      <font-awesome-icon icon="fa-solid fa-trash" @click="deleteMessage" />
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
  border-radius: 15px 0 15px 15px // лево-верх право-верх право-низ лево-низ
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
