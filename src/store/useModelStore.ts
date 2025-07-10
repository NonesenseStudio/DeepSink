import { defineStore } from "pinia";

export const useModelStore = defineStore("model", {
  state: () => ({
    model: {
      id: "" as string,
    } as any,
    modelList: [] as any[],
  }),
  actions: {
    setModel(model: any) {
      this.model = model;
    },
    setModelList(modelList: any[]) {
      this.modelList = modelList;
    },
  },
});
