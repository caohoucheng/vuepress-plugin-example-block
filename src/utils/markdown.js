const fs = require("fs");
const path = require("path");
let mdContainer = require("markdown-it-container");
const MarkdownIt = require("markdown-it");
const localMd = MarkdownIt();
const chalk = require("chalk");

const renderDemoBlock = require('./render')

//设置语法高亮
const highlight = require("./highlight");
//容器组件
const DEMO_COMPONENT_NAME = `demo-block`

module.exports = (options) => {
  const { component = DEMO_COMPONENT_NAME, componentsDir, getComponentName } = options;
  const componentName = component
    .replace(/^\S/, (s) => s.toLowerCase())
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
  return (md) => {
    md.use(mdContainer, "demo", {
      validate(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },
      render(tokens, idx, op, ev, self) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

        if (tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : "";
          const sourceFileToken = tokens[idx + 2];
          //组件名
          let sourceFile = "";
          if (
            sourceFileToken.children &&
            sourceFileToken.children[0] &&
            sourceFileToken.children[0].content
          ) {
            sourceFile = sourceFileToken.children[0].content;
          }
          //组件代码
          let source = "";
          if (sourceFileToken.type === "inline") {
            // 组件引入模式
            source = fs.readFileSync(
              path.resolve(`${componentsDir}/${sourceFile}.vue`),
              "utf-8"
            );
          } else {
            // 直接渲染模式
            for (let i = idx + 1; i < tokens.length; i++) {
              if (
                tokens[i] &&
                tokens[i].type === "fence" &&
                tokens[i].content
              ) {
                source += tokens[i].content;
              }
            }
            const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
            console.log('@@@@@@source', md.utils.escapeHtml(source))
            console.log('@@@@@@content', content)
          }
          // console.log(chalk.yellow('source:', source))
          const cptName = getComponentName(sourceFile);
          const encodeOptionsStr = encodeURI(JSON.stringify(options));
          let result = `<${componentName} 
          componentName="${cptName}" 
          :options="JSON.parse(decodeURI('${encodeOptionsStr}'))"
          description="${encodeURIComponent(localMd.render(description))}"
          sourceFile="${sourceFile}"
          raw-source="${encodeURIComponent(source)}"
          source="${encodeURIComponent(highlight(source, "vue"))}"
          >
        `;
          return result;
        }
        return `</${componentName}>`;
      },
    });
  };
};
