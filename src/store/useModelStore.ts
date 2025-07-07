import { defineStore } from "pinia";

export const useModelStore = defineStore("model", {
  state: () => ({
    model: {
      id: "" as string,
    },
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
