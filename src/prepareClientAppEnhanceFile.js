const { globby, path } = require("@vuepress/utils");

module.exports = async (app, options) => {
  const getComponentsFromDir = async ({
    componentsDir,
    componentsPatterns,
    getComponentName,
  }) => {
    if (!componentsDir) {
      return {};
    }
    // 匹配组件文件的 Patterns,获取组件文件夹下 "**/*.vue" 文件
    const componentsDirFiles = await globby(componentsPatterns, {
      cwd: componentsDir,
    });

    // console.log('componentsDirFiles', componentsDirFiles)
    // transform files to name => filepath map
    // 键值对列表转换为一个对象
    return Object.fromEntries(
      componentsDirFiles.map((filename) => [
        getComponentName(filename),
        path.resolve(componentsDir, filename),
      ])
    );
  };

  const componentsFromDir = await getComponentsFromDir(options);
  // console.log("componentsFromDir", componentsFromDir)
  const baseComponents = {
    DemoBlock: path.resolve(__dirname, "./DemoBlock.vue"),
  };
  const DemoTest = {
    DemoTest: path.resolve(__dirname, "./DemoTest.vue"),
  };
  const componentsMap = {
    ...componentsFromDir,
    ...options.components,
    ...baseComponents,
    ...DemoTest
  };
  const content = `\
    import { defineClientConfig } from '@vuepress/client'
    import { defineAsyncComponent } from 'vue'
    export default defineClientConfig({
        enhance({ app }){\
            ${Object.entries(componentsMap).map(
    ([name, filepath]) => `
            app.component(${JSON.stringify(
      name
    )}, defineAsyncComponent(() => import(${JSON.stringify(
      filepath
    )})))`
  )}
        },
    })
    `;
  // console.log('content:', content)
  // write temp file and return the file path
  return app.writeTemp(`client.js`, content);
};
