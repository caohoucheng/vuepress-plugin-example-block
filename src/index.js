
const fs = require('fs');
const chalk = require("chalk");
const { hash, path } = require("@vuepress/utils");
const chokidar = require("chokidar");
const renderDemoBlock = require('./utils/render')
// markdown type重写
const markDownContainers = require('./utils/markdown')
// 动态加载组件示例组件
const prepareClientAppEnhanceFile = require("./prepareClientAppEnhanceFile");

// 插件名
const PLUGIN_NAME = `vuepress-plugin-example-block`;

module.exports = (options = {}) => {
  return (app) => {
    if (!options.path) {
      console.log(chalk.green`[${PLUGIN_NAME}]:找不到组件目录,请设置插件配置` + '({path:__dirname})')
      throw Error(
        `[${PLUGIN_NAME}]:not find componentsDir,please BlockDemo({path:__dirname})`
      );
    }

    //注册组件路径,默认 ../examples
    const COMPONENTS_DIR = path.resolve(options.path, options.dir || "../examples");
    const COMPONENTS_PATTERNS = ["**/*.vue"];

    // 判断组件路径是否存在
    if (!fs.existsSync(COMPONENTS_DIR)) {
      console.log(chalk.green`[${PLUGIN_NAME}]:组件路径不存在 目录${COMPONENTS_DIR}`)
      throw Error(
        `[${PLUGIN_NAME}]:component path does not exist ( dir:${COMPONENTS_DIR} )`
      );
    }
    options = Object.assign(
      {
        components: {},
        componentsDir: COMPONENTS_DIR,
        componentsPatterns: COMPONENTS_PATTERNS,
        getComponentName: (filename) =>
          path.trimExt(filename.replace(/\/|\\/g, "-")),
      },
      options
    );
    const { componentsDir, componentsPatterns } = options;
    return {
      name: PLUGIN_NAME,
      // 导入前端配置
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
        // console.log('11111111111111md',md)
        md.use(markDownContainers(options, md));
        
        // const id = setInterval(() => {
        //   const render = md.render;
        //   if (typeof render.call(md, '') === 'object') {
        //     md.render = (string) => {
        //       console.log('@@@result@@@@@@@@@@@@@@@@',result)
        //       result.dataBlockString = `${script}\n${style}\n${result.dataBlockString}`;
        //       return result;
        //     }
        //     clearInterval(id);
        //   }
        // }, 10);
      },
      // 启动开发服务器并开始监听文件修改后被调用
      onWatched: (app, watchers, restart) => {
        // console.log('componentsDir', componentsDir)
        if (componentsDir) {
          const componentsWatcher = chokidar.watch(componentsPatterns, {
            cwd: componentsDir,
            ignoreInitial: true,
          });
          componentsWatcher.on("unlink", (event, path) => {
            // console.log('unlink:')
            prepareClientAppEnhanceFile(app, options);
          });
          componentsWatcher.on("change", (event, path) => {
            // console.log('change:', event, path)
            prepareClientAppEnhanceFile(app, options);
            // restart()
          });
          watchers.push(componentsWatcher);
        }
      }
    };
  }
}
