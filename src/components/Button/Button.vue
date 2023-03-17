<template>
  <div class="button">
    <button><slot></slot></button>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="sass" scoped>
.button
  max-width: 400px
  margin: 0 auto
  button
    width: 100%
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
