<template>
  <div class="passwordinput">
    <input
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      placeholder="Password"
      :type="!isShowed ? 'password' : 'text'"
    />
    <img
      v-if="isShowed"
      @click="isShowed = false"
      src="../../../public/res/hide.png"
      alt="eye"
    /><img
      @click="isShowed = true"
      v-else
      src="../../../public/res/show.png"
      alt="eye"
    />
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  props: ["width", "height", "modelValue"],
  data() {
    return {
      isShowed: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.passwordinput {
  position: relative;
  input {
    width: v-bind(width);
    height: v-bind(height);
    background-color: #f9f9f9;
    border-radius: 15px;
    outline: none;
    border: none;
    font-size: 20px;
    padding-left: 10px;
    box-sizing: border-box;
    transition: 0.8s linear;

    &:focus {
      border: 1px solid gray;
      background-color: #ffffff;
    }
  }

  img {
    width: 36px;
    height: 36px;
  }

  img {
    position: absolute;
    right: 10px;
    top: 2px;
    cursor: pointer;
  }
}
</style>
