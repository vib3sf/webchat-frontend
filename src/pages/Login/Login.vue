<template>
  <Wrapper>
    <FormWrapper
      ><Logo />
      <h1>Login to your account</h1>
      <p>
        Don't have an account?
        <router-link
          to="/registration"
          style="text-decoration: none; color: #4796ff"
        >
          Sign up
        </router-link>
      </p>
      <div class="inputs">
        <Input
          v-model="name"
          width="100%"
          height="40px"
          placeholder="Nickname"
          type="text"
        />
        <PasswordInput v-model="password" width="100%" height="40px" />
      </div>
      <Button @click="handleLogin"> Sign up </Button>
      <p class="error">{{ error }}</p>
    </FormWrapper>
  </Wrapper>
</template>

<script>
import Wrapper from "../../components/Wrapper/Wrapper.vue";
import FormWrapper from "../../components/FormWrapper/FormWrapper.vue";
import Logo from "../../components/Logo/Logo.vue";
import Input from "../../components/Input/Input.vue";
import PasswordInput from "../../components/PasswordInput/PasswordInput.vue";
import Button from "../../components/Button/Button.vue";
import { login } from "../../api/user.js";

export default {
  name: "Login",
  components: {
    Wrapper,
    FormWrapper,
    Logo,
    Input,
    PasswordInput,
    Button,
  },
  data() {
    return {
      name: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        await login(this.name, this.password);
        this.$router.push({ name: "chat" });
        location.reload();
        this.name = "";
        this.password = "";
      } catch (error) {
        this.error = "Somethint went wrong. Please try again later!";
        setTimeout(() => {
          this.error = "";
        }, 3000);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
h1
  text-align: center
  margin-top: 45px


p
  text-align: center
  margin-bottom: 50px


.inputs
  max-width: 400px
  margin: 0 auto
  margin-bottom: 50px

  input:first-child
    margin-bottom: 10px

.error
  color: red
  font-weight: bold
</style>
