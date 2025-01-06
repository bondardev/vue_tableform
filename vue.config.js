const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://159.253.18.155", // URL вашего API
        changeOrigin: true,
        pathRewrite: { "^/api": "/api/v1" },
      },
    },
  },
});
