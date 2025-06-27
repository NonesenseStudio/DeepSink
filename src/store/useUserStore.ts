import { defineStore } from "pinia";

type UserStore = {
  userInfo: {
    username: string;
    access_token: string;
    refresh_token: string;
  };
};
export const useUserStore = defineStore("user", {
  state: (): UserStore => ({
    userInfo: {
      username: "",
      access_token: "",
      refresh_token: "",
    },
  }),
  actions: {
    setUserInfo(userInfo: UserStore["userInfo"]) {
      this.userInfo = userInfo;
    },
  },
});
