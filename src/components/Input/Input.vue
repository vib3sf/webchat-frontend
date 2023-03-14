<script setup>
import { ref } from "vue";
// eslint-disable-next-line no-undef
const props = defineProps([
  "width",
  "height",
  "placeholder",
  "modelValue",
  "type",
]);
const width = ref(props.width);
const height = ref(props.height);
</script>

<template>
  <input
    @input="$emit('update:modelValue', $event.target.value)"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :type="props.type"
  />
</template>

<style lang="sass" scoped>
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
</style>
