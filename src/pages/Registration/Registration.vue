<template>
  <Wrapper>
    <FormWrapper
      ><Logo />
      <h1>Create an account</h1>
      <p>
        Already have an account?
        <router-link to="/login" style="text-decoration: none; color: #4796ff">
          Sign in
        </router-link>
      </p>
      <div class="inputs">
        <Input
          v-model="email"
          width="100%"
          height="40px"
          placeholder="Email"
          type="text"
        />
        <div class="small">
          <Input
            v-model="name"
            type="text"
            placeholder="Nickname"
            width="63%"
            height="40px"
          />
          <PasswordInput v-model="password" width="100%" height="40px" />
        </div>
      </div>
      <Button @click="handleRegister" @keydown.enter="handleRegister">
        Sign in
      </Button>
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
import { register } from "../../api/user.js";

export default {
  name: "Registration",
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
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        await register(this.name, this.email, this.password);
        this.$router.push({ name: "chat" });
        location.reload();
        this.name = "";
        this.email = "";
        this.password = "";
      } catch (error) {
        this.error = "Something went wrong. Please try again later!";
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

  .small
    margin-top: 10px
    display: flex
    justify-content: space-between
    margin-bottom: 50px

.error
  color: red
  font-weight: bold
</style>
