<template>
  <div class="formwrapper"><slot></slot></div>
</template>

<script lang="ts" setup></script>

<style lang="sass" scoped>
.formwrapper
  max-width: 600px
  height: 500px
  background-color: #ffffff
  border-radius: 15px // скругление границы
  margin: 0 auto // центрирование по горизонтали
  box-sizing: border-box // размеры элемента уже включают в себя padding и margin
</style>
