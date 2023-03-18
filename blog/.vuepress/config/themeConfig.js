module.exports = {
  siteName: "1980's Maker",
  logo: '/logo.jpg',
  siteDesc: '一个出生于1999年的Font End Web开发程序员',
  nav: [
    { text: '🏠 Home', link: '/' },
    {
      text: '📖 Study Process',
      // link: '/categories/studyprogress/',
      items: [
        {
          text: 'HTML+CSS',
          link: '/categories/htmlcss/'
        },
        {
          text: 'JS',
          link: '/categories/js/'
        },
        {
          text: 'Vue',
          link: '/categories/vue/'
        },
        {
          text: 'React',
          link: '/categories/react/'
        },
        {
          text: 'Uniapp',
          link: '/categories/Uniapp/'
        }
      ]
    },
    { text: '🐉 Program Experience', link: '/categories/programexperience/' },
    // { text: '🔥 Animation', link: '/categories/animation/' },
    {
      text: '📽 Program Difficulty',
      link: '/categories/programdifficulty/',
      items: [
        {
          text: 'HTML+CSS',
          link: '/categories/htmlcss/'
        },
        {
          text: 'JS',
          link: '/categories/js/'
        },
        {
          text: 'Vue',
          link: '/categories/vue/'
        },
        {
          text: 'React',
          link: '/categories/react/'
        },
        {
          text: 'Uniapp',
          link: '/categories/Uniapp/'
        }
      ]
    },
    { text: '🔗 Friend Links', link: '/friend-links/' }
  ],
  searchPlaceholder: 'Search',
  searchMaxSuggestions: 10,
  social: [
    {
      type: 'email',
      link: '1071626267@qq.com'
    },
    {
      type: 'github',
      link: 'codeLove9'
    },
    {
      type: 'qq',
      link: 'https://qm.qq.com/cgi-bin/qm/qr?k=BOQqo_x9qElCxHnkHdSO3RToUPbpyyqW&noverify=0&personal_qrcode_source=3'
    }
    // {
    //   type: 'csdn',
    //   link: 'https://blog.csdn.net/a1071626267'
    // }
  ],
  copyright: '© 2023 ❤️ <a target="_blank" href="https://github.com/codeLove9">Xiao Chen</a>',
  blog: {
    directories: [
      {
        id: 'post',
        dirname: '_post',
        path: '/',
        itemPermalink: '/post/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      }
    ],
    frontmatters: [
      {
        id: 'tag',
        keys: ['tag', 'tags'],
        path: '/tags/',
        frontmatter: { title: 'Tag' },
        pagination: {
          lengthPerPage: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'category',
        keys: ['category', 'categories'],
        path: '/categories/',
        frontmatter: { title: 'Category' },
        pagination: {
          lengthPerPage: 10,
          prevText: '',
          nextText: ''
        }
      }
    ],
    sitemap: {
      // hostname: 'https://80shuo.com',
      exclude: ['/404.html']
    },
    feed: {
      canonical_base: 'http://80shuo.com'
    },
    palette: {},
    comment: {}
  }
}
