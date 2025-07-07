import { defineStore } from "pinia";

export const useModelStore = defineStore("model", {
  state: () => ({
    model: "gpt-3.5-turbo",
    modelList: [] as any[],
  }),
  actions: {
    setModel(model: string) {
      this.model = model;
    },
    setModelList(modelList: any[]) {
      this.modelList = modelList;
    },
  },
});
