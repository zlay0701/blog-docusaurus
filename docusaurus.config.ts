import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes } from 'prism-react-renderer'
import social from './data/social'
import type { GiscusConfig } from './src/components/Comment/Giscus'
import type { UtterancesProps } from '@site/src/components/Comment/Utterances'
import type { WalineOptions } from '@site/src/components/Comment/Waline'
import { siteConfig, getCopyright, getCopyright2, getSvgString, profileConfig } from './src/config'

export default async function createConfigAsync(): Promise<Config>
{ return {
  title: siteConfig.title,
  url: 'https://docusaurus.zlay.fun',
  baseUrl: '/',
  favicon: 'images/favicon.ico',
  organizationName: 'kuizuo',
  projectName: 'blog',
  customFields: {
    bio: '道阻且长，行则将至',
    description:
      `是一个由${profileConfig.author}创建的个人博客，主要分享编程开发知识和项目，该网站基于 React 驱动的静态网站生成器 Docusaurus 构建。`,
  },
  themeConfig: {
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: ``,
    // },
    image: 'img/og.png',
    metadata: [
      {
        name: 'author',
        content: profileConfig.author,
      },
      {
        name: 'keywords',
        content: 'blog, java, javascript, typescript, node, react, vue, web, sql',
      },
      {
        name: 'keywords',
        content: '博客, 编程爱好者, Web开发者, 素喂, zlay, Java工程师',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: siteConfig.title,
      logo: {
        alt: '首页',
        src: 'images/favicon.svg',
        srcDark: 'images/favicon.svg',
      },
      hideOnScroll: true,
      items: [
        { html: await getSvgString('mdi:rocket-launch', '导航'), position: 'right', to: '/navigation' },
        { html: await getSvgString('mdi:home', '首页'), position: 'right', to: '/' },
        { html: await getSvgString('mdi:bookshelf', '博客'), position: 'right', to: 'blog' },
        { html: await getSvgString('mdi:box-variant-closed', '项目'), position: 'right', to: 'project' },
        { html: await getSvgString('mdi:leaf', '友链'), position: 'right', to: 'friends' },
        { html: await getSvgString('mdi:user', '关于'), position: 'right', to: 'about' },
        {
          html: await getSvgString('mdi:more-circle', '更多', '0 0 0 0'),
          position: 'right',
          items: [
            { html: await getSvgString('mdi:table', '分类'), to: '/blog/categories' },
            { html: await getSvgString('mdi:tags', '标签'), to: '/blog/tags' },
            { html: await getSvgString('mdi:archive', '归档'), to: 'blog/archive' },
            { html: await getSvgString('mdi:file-code', '作品集'), to: '/portfolio' },
            { html: await getSvgString('mdi:theme', '主题魔改'), to: 'docs/docusaurus-guides' },
          ],
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            { label: '博客', to: 'blog' },
            { label: '归档', to: 'blog/archive' },
            { label: '实战项目', to: 'project' },
          ],
        },
        {
          title: '社交媒体',
          items: [
            { label: '关于我', to: '/about' },
            { label: 'GitHub', href: 'https://github.com/zlay0701' },
          ],
        },
        {
          title: '网站',
          items: [
            { label: 'cyberChef', to: 'https://gchq.github.io/CyberChef' },
          ],
        },
        {
          title: '更多',
          items: [
            { label: '友链', position: 'right', to: 'friends' },
            {
              html: `
                <a href="https://docusaurus.io/zh-CN/" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                </a>
                `,
            },
          ],
        },
      ],
      copyright: getCopyright(),
    },
    algolia: {
      appId: 'GV6YN1ODMO',
      apiKey: '50303937b0e4630bec4a20a14e3b7872',
      indexName: 'kuizuo',
    },
    prism: {
      theme: themes.oneLight,
      darkTheme: themes.oneDark,
      additionalLanguages: ['bash', 'json', 'java', 'python', 'php', 'graphql', 'rust', 'toml', 'protobuf', 'diff'],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    comments: ['waline'], // 支持多个评论服务 可选项  giscus waline utterances
    waline: {
      serverURL: 'https://waline.zlay.fun',
      cssUrl: '/uploads/waline/waline.css',
      locale: {
        placeholder: '请文明评论呀',
      },
      commentCount: false,
      pageview: true,
      lang: 'zh-CN',
      search: false,
      reaction: false,
      imageUploader: false, // 禁止文件上传
      turnstileKey: '0x4AAAAAABgd77_f_MbFV2jY',
      emoji: [
        '/uploads/waline/emojis/weibo',
      ],
      requiredMeta: [
        'nick',
        'mail',
      ],
    } satisfies Partial<WalineOptions>,
    utterances: {
      repo: 'zlay0701/hexo-demo-comments',
      issueTerm: 'pathname',
      theme: 'github-light',
    } satisfies Partial<UtterancesProps>,
    giscus: {
      repo: 'kuizuo/blog',
      repoId: 'MDEwOlJlcG9zaXRvcnkzOTc2MjU2MTI=',
      category: 'General',
      categoryId: 'DIC_kwDOF7NJDM4CPK95',
      theme: 'light',
      darkTheme: 'dark_dimmed',
    } satisfies Partial<GiscusConfig>,
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/tweet-theme.css'],
        },
        sitemap: {
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-S4SD5NXWXF',
          anonymizeIP: true,
        },
        debug: process.env.NODE_ENV === 'development',
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-image-zoom',
    '@docusaurus/plugin-ideal-image',
    // ['docusaurus-plugin-baidu-tongji', { token: 'c9a3849aa75f9c4a4e65f846cd1a5155' }],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: process.env.NODE_ENV === 'development',
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#12affa' },
        ],
      },
    ],
    [
      'vercel-analytics',
      {
        debug: process.env.NODE_ENV === 'development',
        mode: 'auto',
      },
    ],
    [
      './src/plugin/plugin-content-blog', // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
        truncateMarker: /<!--\s*more\s*-->|<!--\s*truncate\s*-->/i,
        path: 'blog',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/kuizuo/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '代码人生：编织技术与生活的博客之旅',
        blogSidebarCount: 10,
        blogSidebarTitle: '近期博客',
        postsPerPage: 12,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: siteConfig.title,
          description: 'feedId:41215011978385457+userId:41840354283324416',
          copyright: getCopyright2(),
        },
      },
    ],
    async function tailwindcssPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    },
    async function injectMotto() {
      return {
        name: 'docusaurus-motto',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `
    (${function () {
      console.log(
        `%c zlay Blog %c https://github.com/zlay0701`,
        'color: #fff; margin: 1em 0; padding: 5px 0; background: #12affa;',
        'margin: 1em 0; padding: 5px 0; background: #efefef;',
      )

      const motto = `
This Webisite Powered By zlay.
Written by Docusaurus, Coding with Love.
--------
Love what you do and do what you love.
`

      if (document.firstChild?.nodeType !== Node.COMMENT_NODE) {
        document.prepend(document.createComment(motto))
      }
    }.toString()})();`,
              },
            ],
          }
        },
      }
    },
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: `${profileConfig.author}的个人博客`,
      },
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Medium.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
  ],
  i18n: { // 支持语言 https://github.com/facebook/docusaurus/tree/main/packages/docusaurus-theme-translations/locales
    defaultLocale: siteConfig.lang,
    locales: [siteConfig.lang],
  },
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  future: {
    v4: true,
    experimental_faster: true,
  },
}
}
