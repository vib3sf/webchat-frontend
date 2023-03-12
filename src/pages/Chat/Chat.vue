<template>
  <Wrapper
    ><div class="chat">
      <header class="header">
        <p class="users">{{ users.length }} users online</p>
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
      <div class="content" id="content" ref="messages">
        <p class="log">{{ log }}</p>
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

<script>
import Wrapper from "../../components/Wrapper/Wrapper.vue";
import Logo from "../../components/Logo/Logo.vue";
import Input from "../../components/Input/Input.vue";
import Message from "../../components/Message/Message.vue";
import { removeSessionFromStorage } from "../../helpers/tokens.js";
import {
  getUserFromStorage,
  removeUserFromStorage,
} from "../../helpers/user.js";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";
export default {
  $el: "app",
  name: "Chat",
  components: {
    Wrapper,
    Logo,
    Input,
    Message,
  },
  data() {
    return {
      user: JSON.parse(getUserFromStorage()),
      message: "",
      messages: [],
      users: [],
      roomId: "famiChat",
      socket: null,
      log: "",
    };
  },
  methods: {
    handleLogout() {
      removeSessionFromStorage();
      removeUserFromStorage();
    },
    addMessage() {
      this.socket.emit("message:add", {
        roomId: this.roomId,
        userName: this.user.name,
        text: this.message,
        userId: this.user._id,
        messageId: nanoid(),
      });
      this.message = "";
    },
  },
  created() {
    this.socket = io("http://localhost:5000", {
      query: {
        roomId: "famiChat",
        userName: JSON.parse(getUserFromStorage())?.name,
      },
    });
    this.socket.emit("message:get");
    this.socket.on("message-list:update", (messages) => {
      this.messages = messages;
      setTimeout(() => {
        let div = this.$refs.messages;
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }, 1000);
    });
    this.socket.emit("user:add", this.user?.name);
    this.socket.on("log", (log) => {
      this.log = log;
      setTimeout(() => {
        this.log = "";
      }, 2000);
    });
    this.socket.on("user-list:update", (users) => {
      this.users = users;
    });
    setTimeout(() => {
      let div = this.$refs.messages;
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }, 1000);
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
    margin: 0 auto
    margin-bottom: 20px
    text-align: center
    position: relative

    .users
      position: absolute
      right: 880px
      top: 10px
      font-weight: bold

    .settings
      height: fit-content
      background-color: #ffffff
      outline: none
      border: none
      cursor: pointer
      font-size: 30px
      color: gray
      font-weight: bold
      position: absolute
      top: 20px
      left: 940px

  .content
    max-width: 100%
    height: 450px
    border-top: 1px solid gray
    border-bottom: 1px solid gray
    overflow: auto
    -ms-overflow-style: none
    scrollbar-width: none

  .content::-webkit-scrollbar
    width: 0
    height: 0


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
