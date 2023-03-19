module.exports = {
  title: 'XiaoChen\'s Blog',
  description: '一个出生于1999年的Font End Web开发程序员',
  port: 8088,
  base: '/myBlog/',
  markdown: {
    lineNumbers: true,
    extractHeaders: [ 'h2', 'h3', 'h4' ],
    plugins: {
      'markdown-it-mark': true,
      'markdown-it-footnote': true,
      'markdown-it-abbr': true,
      'markdown-it-task-lists': true
    }
  },
  theme: require.resolve('../../index'), // 使用本地主题
  themeConfig: require('./config/themeConfig')
}