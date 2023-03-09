<template>
  <div class="button">
    <button><slot></slot></button>
  </div>
</template>

<script>
export default {
  name: "Button",
};
</script>

<style lang="sass" scoped>
.button
  max-width: fit-content
  margin: 0 auto
  button
    width: 400px
    height: 40px
    color: #ffffff
    font-size: 24px
    border-radius: 5px
    background-color: #4796ff
    border: none
    cursor: pointer
    transition: 0.2s linear

    &:hover
      border-radius: 15px
</style>
