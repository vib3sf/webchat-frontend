<template>
  <Wrapper
    ><div class="chat">
      <header class="header">
        <Logo></Logo>
        <button class="settings">...</button>
      </header>
      <div class="content"></div>
      <div class="typingarea">
        <button class="smile-button">
          <img src="../../../public/res/smile.png" alt="smile" />
        </button>
        <div class="inp">
          <Input
            type="text"
            width="100%"
            height="40px"
            placeholder="Start typing"
          />
        </div>
        <input type="text" class="attach-button"><img src="../../../public/res/attachment.png" alt="attachment" /></input>
        <button class="send-button">
          <img src="../../../public/res/send.png" alt="send" />
        </button>
      </div></div
  ></Wrapper>
</template>

<script>
import Wrapper from "../../components/Wrapper/Wrapper.vue";
import Logo from "../../components/Logo/Logo.vue";
import Input from "../../components/Input/Input.vue";
export default {
  name: "Chat",
  components: {
    Wrapper,
    Logo,
    Input,
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
      top: 5px
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

  .typingarea
    max-width: 100%
    height: 78.6px
    display: flex

    .smile-button
      background-color: #ffffff
      width: fit-content
      height: fit-content
      margin: 0 10px
      border: none

      img
        width: 24px
        cursor: pointer
        margin-top: 27.3px

    .inp
        width: 100%
        margin-top: 19.3px

    .attach-button
      background-color: #ffffff
      width: fit-content
      height: fit-content
      margin: 0 10px
      border: none

      img
        width: 24px
        cursor: pointer
        margin-top: 27.3px

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
