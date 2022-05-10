const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // ! TIP 配置坑，默认从根目录开始找文件，如果不配置，就默认从硬盘分区根目录下开始找了
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    proxy: {
      "/api": {
        // 此处的写法，目的是为了 将 /api 替换成 http://maooo.club/
        target: "http://maooo.club/",
        // ! TIP 允许跨域通过配置允许跨域解决无法发送请求的问题
        // 尝试过请求时在header添加Access-Control-Allow-Origin=*，但不管用
        // 然后在配置文件设置代理后成功跨域了
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
