module.exports = {
  siteName: "XiaoChen's Blog",
  logo: '/logo.jpg',
  siteDesc: '一个出生于1999年的Font End Web开发程序员',
  // 左侧sideBar导航栏
  nav: [
    { text: '🏠 Home', link: '/' },
    {
      text: '📖 Study Process',
      link: '/studyprogress/',
      items: [
        {
          text: 'HTML+CSS',
          link: '/studyprogress/htmlcss/'
        },
        {
          text: 'JS',
          link: '/studyprogress/js/'
        },
        {
          text: 'Vue',
          link: '/studyprogress/vue/'
        },
        {
          text: 'React',
          link: '/studyprogress/react/'
        },
        {
          text: 'Uniapp',
          link: '/studyprogress/uniapp/'
        }
      ]
    },
    { text: '🐉 Program Demand', link: '/programdemand/' },
    {
      text: '📽 Program Difficulty',
      // link: '/categories/programdifficulty/',
      items: [
        {
          text: 'HTML+CSS',
          link: '/programdifficulty/htmlcss/'
        },
        {
          text: 'JS',
          link: '/programdifficulty/js/'
        },
        {
          text: 'Vue',
          link: '/programdifficulty/vue/'
        },
        {
          text: 'React',
          link: '/programdifficulty/react/'
        },
        {
          text: 'Uniapp',
          link: '/programdifficulty/uniapp/'
        }
      ]
    },
    { text: '💐 git', link: '/git/' },
    { text: '📋 interview', link: '/interview/' },
    { text: '🔗 Personal Information', link: '/personalInformation/' }
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
  copyright: `© ${new Date().getFullYear()} ❤️ <a target="_blank" href="https://github.com/codeLove9">Xiao Chen</a>`,
  blog: {
    // 开启目录页配置（主）
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
      },
      // id属性为blog插件暴露的$page.pid属性
      {
        id: 'studyprogresshtmlcss',
        dirname: 'studyprogress/htmlcss',
        path: '/studyprogress/htmlcss/',
        itemPermalink: '/studyprogress/htmlcss/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'studyprogressjs',
        dirname: 'studyprogress/js',
        path: '/studyprogress/js/',
        itemPermalink: '/studyprogress/js/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'studyprogressvue',
        dirname: 'studyprogress/vue',
        path: '/studyprogress/vue/',
        itemPermalink: '/studyprogress/vue/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'studyprogressreact',
        dirname: 'studyprogress/react',
        path: '/studyprogress/react/',
        itemPermalink: '/studyprogress/react/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'studyprogressuniapp',
        dirname: 'studyprogress/uniapp',
        path: '/studyprogress/uniapp/',
        itemPermalink: '/studyprogress/uniapp/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'programdifficultyhtmlcss',
        dirname: 'programdifficulty/htmlcss',
        path: '/programdifficulty/htmlcss/',
        itemPermalink: '/programdifficulty/htmlcss/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'programdifficultyjs',
        dirname: 'programdifficulty/js',
        path: '/programdifficulty/js/',
        itemPermalink: '/programdifficulty/js/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'programdifficultyvue',
        dirname: 'programdifficulty/vue',
        path: '/programdifficulty/vue/',
        itemPermalink: '/programdifficulty/vue/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'programdifficultyreact',
        dirname: 'programdifficulty/react',
        path: '/programdifficulty/react/',
        itemPermalink: '/programdifficulty/react/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: 'programdifficultyuniapp',
        dirname: 'programdifficulty/uniapp',
        path: '/programdifficulty/uniapp/',
        itemPermalink: '/programdifficulty/uniapp/:year/:month/:day/:slug.html',
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
    /*  sitemap: {
      hostname: 'https://codelove9.github.io/myBlog/',
      exclude: ['/404.html']
    }, */
    feed: {
      canonical_base: 'https://codelove9.github.io/myBlog/'
    },
    // 访客主题配色自定义
    palette: {
      colors: [
        {
          btnColor: '#673ab7',
          paletteVars: {
            dark: `--theme-accent-color: #673ab7;
          --theme-foreground-color: #d8d8d8;
          --theme-border-color: #444;
          --theme-background: #202020;
          --theme-sidebar-background: #673ab7;
          --theme-card-background: #252525;
          --theme-card-color: #252525;
          --theme-bg-tertiary-color: #161b22;
          --theme-accent-color-005: rgba(103,58,183,0.05);
          --theme-accent-color-01: rgba(103,58,183,0.1);
          --theme-accent-color-02: rgba(103,58,183,0.2);
          --theme-accent-color-04: rgba(103,58,183,0.4);
          --theme-accent-color-08: rgba(103,58,183,0.8);`,
            light: `--theme-accent-color: #673ab7;
          --theme-foreground-color: #363636;
          --theme-border-color: #e0e0e0;
          --theme-sidebar-background: #673ab7 linear-gradient(to bottom, #673ab7 0%, #522e92 100%);
          --theme-card-background: #fff;
          --theme-bg-tertiary-color: #f6f8fa;
          --theme-accent-color-005: rgba(103,58,183,0.05);
          --theme-accent-color-01: rgba(103,58,183,0.1);
          --theme-accent-color-02: rgba(103,58,183,0.2);
          --theme-accent-color-04: rgba(103,58,183,0.4);
          --theme-accent-color-08: rgba(103,58,183,0.8);`
          }
        },
        {
          btnColor: '#3f51b5',
          paletteVars: {
            dark: `--theme-accent-color: #3f51b5; --theme-sidebar-background: #3f51b5;`,
            light: `--theme-accent-color: #3f51b5; --theme-sidebar-background: #3f51b5;`
          }
        }
      ]
    },
    comment: {}
  }
}
