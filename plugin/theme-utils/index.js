const counter = function (content) {
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length
  const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length
  return [cn, en]
}
const calcReadingTime = function (content, { cn = 300, en = 160 } = {}) {
  var len = counter(content)
  var readingTime = len[0] / cn + len[1] / en
  return readingTime < 1 ? '1' : parseInt(readingTime, 10)
}
const wordcount = function (content) {
  var len = counter(content)
  var count = len[0] + len[1]
  if (count < 1000) {
    return count
  }
  return Math.round(count / 100) / 10 + 'k'
}

// BUG： 此文件下一引入公共js文件就报错，只能再次定义一次，不知道原因
// 定义Pagetype返回值为home的数组，展示目录结构
const HomePagetypeList = ['/', '/studyprogress/htmlcss/', '/studyprogress/js/', '/studyprogress/vue/', '/studyprogress/react/', '/studyprogress/uniapp/', '/programdifficulty/htmlcss/', '/programdifficulty/js/', '/programdifficulty/vue/', '/programdifficulty/react/', '/programdifficulty/uniapp/']

// 定义pid列表,展示文章字数和时间
const pidList = ['post', 'studyprogresshtmlcss', 'studyprogressjs', 'studyprogressvue', 'studyprogressreact', 'studyprogressuniapp', 'programdifficultyhtmlcss', 'programdifficultyjs', 'programdifficultyvue', 'programdifficultyreact', 'programdifficultyuniapp']

// 定义路由path列表,展示文章字数和时间
const pathList = ['/programdemand/', '/git/', '/personalInformation/']

module.exports = (options = {}, context) => ({
  name: 'maker-theme-utils',
  extendPageData($page) {
    if ($page.path === '/archives/') {
      return ($page.pageType = 'archive')
    } else if ($page.path === '/categories/') {
      return ($page.pageType = 'category')
    } else if (/^\/categories\/\w/.test($page.path)) {
      return ($page.pageType = 'categoryItem')
    } else if ($page.path === '/tags/') {
      return ($page.pageType = 'tag')
    } else if (/^\/tags\/\w/.test($page.path)) {
      return ($page.pageType = 'tagItem')
      // TODO: pagetype返回类型
      // } else if ($page.path === '/' || $page.path.startsWith('/page/') || $page.path === '/studyprogress/htmlcss/') {
    } else if (~HomePagetypeList.indexOf($page.path) || $page.path.startsWith('/page/')) {
      return ($page.pageType = 'home')
    } else if ($page.path === '/friend-links/') {
      return ($page.pageType = 'friendLink')
    }
    // 文章字数和阅读时间统计
    // if ($page.pid === 'post') {
    if (~pidList.indexOf($page.pid) || ~pathList.indexOf($page.path)) {
      const { _strippedContent } = $page
      let content = _strippedContent.replace(/\s/g, '')
      $page.wordCount = wordcount(content)
      $page.readingTime = calcReadingTime(content, context.themeConfig.wordPerminute)
    }
  },
  additionalPages() {
    const pages = [
      {
        path: '/archives/',
        frontmatter: {
          title: 'Archive'
        }
      }
    ]
    return pages
  }
})
