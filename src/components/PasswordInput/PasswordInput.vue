<script setup>
import { ref, defineProps } from "vue";
const props = defineProps(["width", "height", "modelValue"]);
const isShowed = ref(false);
const width = ref(props.width);
const height = ref(props.height);
</script>

<template>
  <div class="passwordinput">
    <input
      @input="$emit('update:modelValue', $event.target.value)"
      :value="props.modelValue"
      placeholder="Password"
      :type="!isShowed.value ? 'password' : 'text'"
    />
    <img
      v-if="isShowed"
      @click="isShowed.value = false"
      src="../../../public/res/hide.png"
      alt="eye"
    /><img
      @click="isShowed.value = true"
      v-else
      src="../../../public/res/show.png"
      alt="eye"
    />
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



  img
    width: 36px
    height: 36px


  img
    position: absolute
    right: 10px
    top: 2px
    cursor: pointer
</style>
