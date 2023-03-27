<script lang="ts" setup>
import { ref, defineProps } from "vue";

interface Props {
  width: string;
  height: string;
  placeholder: string;
  modelValue: string;
  type: string;
}

const props = defineProps<Props>();
const width = ref<string>(props.width);
const height = ref<string>(props.height);
</script>

<template>
  <input
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
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
