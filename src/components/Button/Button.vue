<template>
  <div class="button">
    <button><slot></slot></button>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="sass" scoped>
.button
  max-width: 400px
  margin: 0 auto // отступы от соседнего элемента(0 снизу и сверху, по бокам центрирование)
  button
    width: 100% // занимает всю доступную ширину
    height: 40px
    color: #ffffff
    font-size: 24px // размер шрифта
    border-radius: 5px // скругление углов границы
    background-color: #4796ff
    border: none // убираем границу
    cursor: pointer
    transition: 0.2s linear // анимация при наведении(ниже указана) 200мс линейная

    &:hover
      border-radius: 15px
</style>
