<template>
  <div class="button">
    <button @click="log"><slot></slot></button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ["name", "password"],
  methods: {
    log() {
      console.log(this.$props.name, this.$props.password);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  max-width: fit-content;
  margin: 0 auto;
  button {
    width: 400px;
    height: 40px;
    color: #ffffff;
    font-size: 24px;
    border-radius: 5px;
    background-color: #4796ff;
    border: none;
    cursor: pointer;
    transition: 0.2s linear;

    &:hover {
      border-radius: 15px;
    }
  }
}
</style>
