<template>
  <input
    @input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type"
  />
</template>

<script>
export default {
  name: "PasswordInput",
  props: ["width", "height", "placeholder", "modelValue", "type"],
};
</script>

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
