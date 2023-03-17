<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import Wrapper from "../../components/Wrapper/Wrapper.vue";
import Logo from "../../components/Logo/Logo.vue";
import Input from "../../components/Input/Input.vue";
import Message from "../../components/Message/Message.vue";
import { removeSessionFromStorage } from "../../helpers/tokens";
import { getUserFromStorage, removeUserFromStorage } from "../../helpers/user";
import { io, Socket } from "socket.io-client";
import { nanoid } from "nanoid";
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface User {
  _id: string;
  email: string;
  name: string;
}

interface IMessage {
  messageId: string;
  text: string;
  roomId: string;
  userId: string;
  userName: string;
  createdAt: string;
}

const user = reactive(JSON.parse(getUserFromStorage() || "{}"));
const message = ref<string>("");
const messages = reactive<Array<IMessage>>([]);
const users = reactive<Array<User>>([]);
const roomId = "famiChat";
const log = ref<string>("");
const block = ref<HTMLElement>(document.body);

var socket: Socket<DefaultEventsMap, DefaultEventsMap>;

function handleLogout() {
  removeSessionFromStorage();
  removeUserFromStorage();
}

function addMessage() {
  socket.emit("message:add", {
    roomId: roomId,
    userName: user.name,
    text: message.value,
    userId: user._id,
    messageId: nanoid(),
  });
  message.value = "";
}

onMounted(() => {
  socket = io("http://localhost:5000", {
    query: {
      roomId: "famiChat",
      userName: user?.name,
    },
  });
  socket.emit("message:get");
  socket.on("message-list:update", (msgs) => {
    msgs.map((msg: IMessage) => messages.push(msg));
    setTimeout(() => {
      let div = block.value;
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }, 1000);
  });
  socket.emit("user:add", user?.name);
  socket.on("log", (l) => {
    log.value = l;
    setTimeout(() => {
      log.value = "";
    }, 2000);
  });
  socket.on("user-list:update", (us) => {
    us.map((user: User) => users.push(user));
  });
  setTimeout(() => {
    let div = block.value;
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }, 1000);
});
</script>

<template>
  <Wrapper
    ><div class="chat">
      <header class="header">
        <p class="users">{{ users.length }} users online</p>
        <Logo style="margin: 0"></Logo>
        <router-link to="/login">
          <button class="settings" @click="handleLogout">
            <img
              src="../../../public/res/logout.png"
              class="logout"
              alt="logout"
            />
          </button>
        </router-link>
      </header>
      <div class="content" id="content" ref="block">
        <div class="log">{{ log }}</div>
        <Message
          v-for="(message, idx) in messages"
          :key="idx"
          :userId="message.userId"
          :text="message.text"
          :time="message.createdAt"
          :userName="message.userName"
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
          <img
            src="../../../public/res/send.png"
            alt="send"
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
      color: gray
      font-weight: bold
      margin-right: 20px
      margin-top: 20px

  .content
    max-width: 100%
    height: 450px
    border-top: 1px solid gray
    border-bottom: 1px solid gray
    overflow: auto
    -ms-overflow-style: none
    scrollbar-width: none

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

      img
        width: 24px
        cursor: pointer
        margin-top: 27.3px
</style>
