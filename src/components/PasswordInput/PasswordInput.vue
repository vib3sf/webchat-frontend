<script lang="ts" setup>
import { ref, defineProps } from "vue";

interface Props {
  width: string;
  height: string;
  modelValue: string;
}

const props = defineProps<Props>();
const isShowed = ref<boolean>(false);
const width = ref<string>(props.width);
const height = ref<string>(props.height);
</script>

<template>
  <div class="passwordinput">
    <input
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :value="props.modelValue"
      placeholder="Password"
      :type="!isShowed ? 'password' : 'text'"
    />
    <!-- emit==> при вводе чего-либо в инпут вызывается функция v-model -->
    <font-awesome-icon
      v-if="isShowed"
      @click="isShowed = false"
      icon="fa-solid fa-eye-slash"
    />
    <font-awesome-icon @click="isShowed = true" v-else icon="fa-solid fa-eye" />
  </div>
</template>

<style lang="sass" scoped>
.passwordinput
  position: relative
  input
    width: v-bind(width)
    height: v-bind(height)
    background-color: #f9f9f9
    border-radius: 15px
    outline: none
    border: none
    font-size: 20px
    padding-left: 10px
    box-sizing: border-box
    transition: 0.8s linear

    &:focus
      border: 1px solid gray
      background-color: #ffffff



  .fa-eye
    position: absolute
    right: 10px
    top: 2px
    cursor: pointer
    width: 24px
    height: 36px
    &:hover
      color: #0650d0

  .fa-eye-slash
    position: absolute
    right: 10px
    top: 2px
    cursor: pointer
    width: 24px
    height: 36px
    &:hover
      color: #0650d0
</style>
