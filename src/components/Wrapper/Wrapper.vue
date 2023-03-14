<template>
  <div class="wrapper"><slot></slot></div>
</template>

<script setup></script>

<style lang="sass" scoped>
.wrapper
  width: 100vw
  height: 100vh
  background: rgb(238, 174, 202)
  background: radial-gradient(circle,rgba(238, 174, 202, 1) 0%,rgba(148, 187, 233, 1) 100%)
  padding-top: 80px
  box-sizing: border-box
</style>
