import { defineStore } from "pinia";

type UserStore = {
  userInfo: {
    username: string;
    token: string;
  };
};
export const useUserStore = defineStore("user", {
  state: (): UserStore => ({
    userInfo: {
      username: "",
      token: "",
    },
  }),
  actions: {
    setUserInfo(userInfo: UserStore["userInfo"]) {
      this.userInfo = userInfo;
    },
  },
});
