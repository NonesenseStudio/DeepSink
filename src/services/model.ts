import instance from "./index.ts";

//使用一个模型
export const selectModel = (modelId: string) => {
  return instance.post(`/models/select-model`, { modelId });
};

//当前使用模型
export const getCurrentModel = () => {
  return instance.post(`/models/current-model`);
};

export const getModels = () => {
  return instance.get(`/models`);
};
