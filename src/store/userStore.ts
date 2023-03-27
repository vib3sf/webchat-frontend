import { defineStore } from "pinia";
import { reactive } from "vue";

interface User {
  _id?: string;
  name?: string;
  email?: string;
}

export const useUserStore = defineStore("userStore", () => {
  let user = reactive<User>({});

  const saveUser = (obj: User) => {
    user = obj;
  };

  const deleteUser = () => {
    user = {};
  };

  return { user, saveUser, deleteUser };
});
