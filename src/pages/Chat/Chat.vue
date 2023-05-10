<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import Wrapper from "../../components/Wrapper/Wrapper.vue";
import Logo from "../../components/Logo/Logo.vue";
import Input from "../../components/Input/Input.vue";
import Message from "../../components/Message/Message.vue";
import { removeSessionFromStorage } from "../../helpers/tokens";
import { removeUserFromStorage } from "../../helpers/user";

// interface User {
//   _id: string;
//   email: string;
//   name: string;
// }

interface IMessage {
  id: string;
  user_id: string;
  content: string;
  user_name: string;
  created_at: string;
}

const message = ref<string>("");
const messages = reactive<Array<IMessage>>([]);
//const users = ref<string>("");
const log = ref<string>("");
const block = ref<HTMLElement>(document.body);
const roomId = "ChatRoom";

function handleLogout() {
  removeSessionFromStorage();
  removeUserFromStorage();
}

function scrollDown() {
  setTimeout(() => {
    let div = block.value;
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }, 300);
}

async function addMessage() {
  const content = message.value;
  const user_id = JSON.parse(localStorage.getItem("user") || "{}").id;
  const user_name = JSON.parse(localStorage.getItem("user") || "{}").username;
  await fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, user_name, content }),
  });
  message.value = "";
  scrollDown();
}

const fetchMessages = async () => {
  console.log(1);
  const responce = await fetch("http://localhost:3000/messages");
  const data = await responce.json();
  messages.splice(0, messages.length, ...data);
  scrollDown();
};

const ws = new WebSocket("ws://localhost:3000/cable");

onMounted(() => {
  ws.onopen = () => {
    console.log("Connected to websocket");
    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: roomId,
          channel: "MessagesChannel",
        }),
      })
    );
  };
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log(data);
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    messages.push(data.message);
  };
  fetchMessages();
});
</script>

<template>
  <Wrapper
    ><div class="chat">
      <header class="header">
        <p class="users">{{ "add" }} users online</p>
        <Logo style="margin: 0"></Logo>
        <router-link to="/login">
          <button class="settings" @click="handleLogout">
            <font-awesome-icon
              icon="fa-solid fa-right-from-bracket"
              class="logout"
            />
          </button>
        </router-link>
      </header>
      <div class="content" id="content" ref="block">
        <div class="log">{{ log }}</div>
        <Message
          v-for="(message, idx) in messages"
          :key="idx"
          :userId="message.user_id"
          :text="message.content"
          :time="message.created_at"
          :userName="message.user_name"
          :message_id="message.id"
          @editMessage="fetchMessages"
          @deleteMessage="fetchMessages"
        />
      </div>
      <div class="typingarea">
        <div class="inp">
          <Input
            v-model="message"
            type="text"
            width="100%"
            height="40px"
            placeholder="Start typing"
          />
        </div>
        <button class="send-button">
          <font-awesome-icon
            icon="fa-solid fa-paper-plane"
            size="2xl"
            @click.stop="addMessage"
          />
        </button>
      </div></div
  ></Wrapper>
</template>

<style lang="sass" scoped>
.chat
  max-width: 1000px
  height: 600px
  background-color: #ffffff
  margin: 0 auto
  border-radius: 15px
  margin-top: 20px

  .header
    max-width: 100%
    height: 50px
    margin: 0 auto
    margin-bottom: 20px
    text-align: center
    display: flex
    justify-content: space-between

    .users
      font-weight: bold
      margin-left: 20px
      margin-top: 25px

    .settings
      height: fit-content
      background-color: #ffffff
      outline: none
      border: none
      cursor: pointer
      font-size: 30px
      font-weight: bold
      margin-right: 20px
      margin-top: 20px
      &:hover
       color: #0650d0

  .content
    max-width: 100%
    height: 450px
    border-top: 1px solid gray
    border-bottom: 1px solid gray
    overflow: auto


    .log
      width: fit-content
      height: 50px
      margin: 0 auto
      margin-top: 10px

  .content::-webkit-scrollbar
    width: 0
    height: 0

  .typingarea
    max-width: 100%
    height: 78.6px
    display: flex
    padding-left: 10px

    .inp
        width: 100%
        margin-top: 19.3px

    .send-button
      background-color: #ffffff
      width: fit-content
      height: fit-content
      margin: 0 10px
      border: none
      cursor: pointer
      margin-top: 25px
      .fa-paper-plane
        &:hover
         color: #0650d0
</style>
