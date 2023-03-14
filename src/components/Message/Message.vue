<script setup>
import { reactive, defineProps } from "vue";
const props = defineProps(["userId", "userName", "text", "time"]);
const user = reactive(JSON.parse(localStorage.getItem("user")));
function checkMessage() {
  return props.userId === user._id ? "your-message" : "other-message";
}
</script>

<template>
  <div :class="checkMessage()">
    <div class="name" v-if="userId != user._id">
      {{ userName }}
    </div>
    <p class="text">{{ text }}</p>
    <p class="time"><timeago :datetime="time"></timeago></p>
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
