module.exports = {
  printWidth: 80, // 单行长度
  tabWidth: 2, // 缩进长度
  useTabs: false, // 使用空格代替tab缩进
  semi: false, // 句末使用分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 仅在必需时为对象的key添加引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'none', // 多行时尽可能打印尾随逗号
  // 'es5'：在 ES5 中有效的尾逗号处添加尾逗号（
  // 'all'：在可能的地方都添加尾逗号（包括对象或数组的最后一个元素）
  // 'none'：不添加尾逗号
  bracketSpacing: true, // 在对象前后添加空格-eg: { foo: bar }
  jsxBracketSameLine: true, // 多属性html标签的‘>’折行放置
  arrowParens: 'avoid', // 'always':(x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  requirePragma: false, // 无需顶部注释即可格式化
  insertPragma: false, // 在已被preitter格式化的文件顶部加上标注
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如 GitHub comment）而按照 markdown 文本样式进行折行
  htmlWhitespaceSensitivity: 'ignore', // 对HTML全局空白不敏感
  vueIndentScriptAndStyle: false, // 不对vue中的script及style标签缩进
  endOfLine: 'lf', // 结束行形式; // 结尾是 \n \r \n\r auto
  embeddedLanguageFormatting: 'auto' // 对引用代码进行格式化
}
