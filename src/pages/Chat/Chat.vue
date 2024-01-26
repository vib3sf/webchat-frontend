<template>
  <Wrapper>
    <div class="chat">
      <header class="header">
        <Logo class="logo"></Logo>
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
          :message="message"
          @editMessage="fetchMessages"
          @deleteMessage="fetchMessages"
        />
      </div>
      <div class="typing-area">
        <Input
          v-model="message"
          class="typing-area-input"
          type="text"
          placeholder="Start typing"
        />
        <button class="send-button">
          <font-awesome-icon
            icon="fa-solid fa-paper-plane"
            size="2xl"
            @click.stop="addMessage"
          />
        </button>
      </div>
    </div>
    <Transition name="fade">
      <p v-if="error" class="error-window">{{ error }}</p>
    </Transition>
  </Wrapper>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Wrapper from "@/components/Wrapper/Wrapper.vue";
import Logo from "@/components/Logo/Logo.vue";
import Input from "@/components/Input/Input.vue";
import Message from "@/components/Message/Message.vue";
import { removeSessionFromStorage } from "@/helpers/tokens";
import { removeUserFromStorage } from "@/helpers/user";
import router from "@/router";

export interface IMessage {
  id: string;
  user_id: string;
  content: string;
  user_name: string;
  created_at: string;
}

const ws = new WebSocket("ws://localhost:3000/cable");
const roomId = "ChatRoom";

const message = ref<string>("");
const messages = reactive<Array<IMessage>>([]);
const log = ref<string>("");
const block = ref<HTMLElement | null>(null);
const error = ref<string>("");

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
    if (data.message.type === "create") {
      messages.push(data.message.data);
    }
    if (
      data.message.type == "connection" ||
      data.message.type == "destroy" ||
      data.message.type == "update"
    ) {
      fetchMessages(data.message.data);
    }
  };
});

function handleLogout(): void {
  removeSessionFromStorage();
  removeUserFromStorage();
  ws.close();
  router.push("/login");
}

function scrollDown(): void {
  setTimeout(() => {
    let div = block.value;
    if (div) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }
  }, 300);
}

async function addMessage() {
  const content = message.value;
  const user_id = JSON.parse(localStorage.getItem("user") || "{}").id;
  const user_name = JSON.parse(localStorage.getItem("user") || "{}").username;
  try {
    await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, user_name, content }),
    });
    message.value = "";
    scrollDown();
  } catch (e) {
    error.value = "Something went wrong. Please try again";
    setTimeout(() => error.value = "", 3000);
  }

}

function fetchMessages(data: Array<IMessage>): void {
  messages.length = 0;
  data.forEach((message) => {
    messages.push(message);
  });
  scrollDown();
}
</script>

<style lang="scss" scoped>
.chat {
  max-width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 15px;

  .header {
    max-width: 100%;
    height: 50px;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .users {
      font-weight: bold;
    }

    .settings {
      height: fit-content;
      background-color: #ffffff;
      outline: none;
      border: none;
      cursor: pointer;
      font-size: 30px;
      font-weight: bold;
      &:hover {
        color: #0650d0;
      }
    }
  }

  .content {
    max-width: 100%;
    height: 100%;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    overflow: auto;

    .log {
      width: fit-content;
      height: 50px;
      margin: 0 auto;
      margin-top: 10px;
    }
  }

  .content::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .typing-area {
    max-width: 100%;
    height: 78.6px;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 15px;

    .input {
      width: 100%;
      height: 40px;
    }

    .send-button {
      background-color: #ffffff;
      width: fit-content;
      height: fit-content;
      border: none;
      cursor: pointer;

      .fa-paper-plane {
        &:hover {
          color: #0650d0;
        }
      }
    }
  }
}
</style>
