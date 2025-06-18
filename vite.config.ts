import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
        dts: "src/auto-imports.d.ts",
        resolvers: [NaiveUiResolver()],
      }),
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "~": resolve(__dirname),
      },
    },
    server: {
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: env.VITE_API_TARGET_URL, // 目标地址
          changeOrigin: true, // 修改请求源（解决跨域）
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), ""), // 移除接口前缀
        },
      },
    },
  };
});
