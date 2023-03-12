<template>
  <Wrapper
    ><div class="chat">
      <header class="header">
        <Logo></Logo>
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
      <div class="content">
        <p class="log">{{ log }}</p>
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
        <button class="send-button" @click="addMessage">
          <img
            src="../../../public/res/send.png"
            alt="send"
            @click="addMessage"
          />
        </button>
      </div></div
  ></Wrapper>
</template>

<script>
import Wrapper from "../../components/Wrapper/Wrapper.vue";
import Logo from "../../components/Logo/Logo.vue";
import Input from "../../components/Input/Input.vue";
import { removeSessionFromStorage } from "../../helpers/tokens.js";
import {
  getUserFromStorage,
  removeUserFromStorage,
} from "../../helpers/user.js";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";
const socket = io("http://localhost:5000", {
  query: {
    roomId: "famiChat",
    userName: JSON.parse(getUserFromStorage())?.name,
  },
});
export default {
  name: "Chat",
  components: {
    Wrapper,
    Logo,
    Input,
  },
  data() {
    return {
      user: JSON.parse(getUserFromStorage()),
      message: "",
      messages: [],
      users: [],
      roomId: localStorage.getItem("roomId"),
      socket: null,
      log: "",
    };
  },
  methods: {
    handleLogout() {
      removeSessionFromStorage();
      removeUserFromStorage();
      socket.off();
    },
    addMessage() {
      socket.emit("message:add", {
        roomId: this.roomId,
        userName: this.user.name,
        text: this.message,
        userId: this.user._id,
        messageId: nanoid(),
      });
    },
  },
  created() {
    socket.emit("message:get");
    socket.on("message-list:update", (messages) => {
      console.log(messages);
      this.messages = messages;
    });
    socket.emit("user:add", this.user?.name);
    socket.on("log", (log) => {
      this.log = log;
      setTimeout(() => {
        this.log = "";
      }, 2000);
    });
    socket.on("user-list:update", (users) => {
      this.users = users;
    });
  },
};
</script>

<style lang="sass" scoped>
.chat
  max-width: 1000px
  height: 600px
  background-color: #ffffff
  margin: 0 auto
  border-radius: 15px

  .header
    max-width: 100%
    height: 50px
    margin-bottom: 20px
    position: relative
    text-align: center

    .settings
      position: absolute
      left: 950px
      top: 17px
      background-color: #ffffff
      outline: none
      border: none
      cursor: pointer
      font-size: 30px
      color: gray
      font-weight: bold

  .content
    max-width: 100%
    height: 450px
    border-top: 1px solid gray
    border-bottom: 1px solid gray

    .log
      text-align: center

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
