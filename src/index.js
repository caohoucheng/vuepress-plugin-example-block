
const chalk = require("chalk");
const { hash, path } = require("@vuepress/utils");
const chokidar = require("chokidar");
// markdown type重写
const markDownContainers = require('./utils/markdown')
// 动态加载组件示例组件
const prepareClientAppEnhanceFile = require("./prepareClientAppEnhanceFile");

const PLUGIN_NAME = `vuepress-plugin-example-block`;
//注册组件路径
const COMPONENTS_DIR = "../examples";
const COMPONENTS_PATTERNS = ["**/*.vue"];

module.exports = (options = {}) => {
  return (app) => {
    if (!options.path) {
      throw Error(
        `[${PLUGIN_NAME}]:not find componentsDir,please BlockDemo({path:__dirname})`
      );
    }
    options = Object.assign(
      {
        components: {},
        componentsDir: path.resolve(options.path, COMPONENTS_DIR),
        componentsPatterns: COMPONENTS_PATTERNS,
        getComponentName: (filename) =>
          path.trimExt(filename.replace(/\/|\\/g, "-")),
      },
      options
    );
    const { componentsDir, componentsPatterns } = options;
    return {
      name: PLUGIN_NAME,
      clientConfigFile: path.resolve(
        options.path,
        ".temp/client.js"
      ),
      // 初始化后被立即调用
      onInitialized: () => {
        prepareClientAppEnhanceFile(app, options)
      },
      // 添加额外的 markdown-it 插件
      extendsMarkdown: (md) => {
        md.use(markDownContainers(options));
      },
      // 启动开发服务器并开始监听文件修改后被调用
      onWatched: (app, watchers, restart) => {
        console.log('componentsDir', componentsDir)

        if (componentsDir) {
          const componentsWatcher = chokidar.watch(componentsPatterns, {
            cwd: componentsDir,
            ignoreInitial: true,
          });
          componentsWatcher.on("unlink", (event, path) => {
            console.log('unlink:')
            prepareClientAppEnhanceFile(app, options);
          });
          componentsWatcher.on("change", (event, path) => {
            console.log('change:', event, path)
            prepareClientAppEnhanceFile(app, options);
            // restart()
          });
          watchers.push(componentsWatcher);
        }
      }
    };
  }
}
