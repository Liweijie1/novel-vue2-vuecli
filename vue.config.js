const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias
     .set('@', path.resolve(__dirname, 'src')); // 调整路径指向以适配实际资源目录位置
  }
})
