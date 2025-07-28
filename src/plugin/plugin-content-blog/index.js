import {
  parseMarkdownFile,
  normalizeUrl,
  aliasedSitePath,
  getEditUrl,
  getFolderContainingFile,
  posixPath,
  Globby,
  groupTaggedItems,
  getTagVisibility,
  getFileCommitDate,
  getContentPathList,
  isUnlisted,
  isDraft,
  readLastUpdateData,
  normalizeTags,
  aliasedSitePathToRelativePath,
} from '@docusaurus/utils'
import _ from 'lodash'
import { getCategoriesByfrontMatter } from './utils'
import yaml from 'js-yaml'
import fs from 'fs'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const blogPluginExports = require('@docusaurus/plugin-content-blog')
const { default: blogPlugin } = blogPluginExports

async function blogPluginEnhanced(context, options) {
  const blogPluginInstance = await blogPlugin(context, options)
  const { postsPerPage, pageBasePath, blogDescription, blogTitle, blogSidebarTitle, routeBasePath } = options
  const blogTagsListPath = routeBasePath + '/categories'
  const categoriesYaml = routeBasePath + '/categories.yml'
  // const sidebarModulePath = createSidebarModule()
  const postsPerPageOption = postsPerPage
  // console.log('options' + JSON.stringify(context.i18n.defaultLocale))
  // console.log('options' + JSON.stringify(blogSidebarTitle))

  return {
    ...blogPluginInstance,
    async contentLoaded({ content, allContent, actions }) {
      // Sort blog with sticky
      content.blogPosts.sort((a, b) => (b.metadata.frontMatter.sticky || 0) - (a.metadata.frontMatter.sticky || 0))

      // Group posts by postsPerPage
      const groupedPosts = Array.from({ length: Math.ceil(content.blogPosts.length / postsPerPage) }, (_, i) => ({
        items: content.blogPosts.slice(i * postsPerPage, (i + 1) * postsPerPage).map(post => post.id),
      }))

      // Update paginated blog list
      content.blogListPaginated.forEach((page, i) => {
        page.items = groupedPosts[i] ? groupedPosts[i].items : []
      })

      // Create default plugin pages
      await blogPluginInstance.contentLoaded({ content, allContent, actions })
      const [blogPostsReq, categoryCountArray] = putCatToBlogPosts(content.blogPosts)// 构造分类所需数据
      content.blogPosts = blogPostsReq // 将分类页加入到blogPosts
      // Create your additional pages
      const { blogPosts, blogListPaginated, blogTags, authorsMap } = content
      const { setGlobalData, createData, addRoute } = actions

      setGlobalData({
        posts: content.blogPosts.slice(0, 10), // Only store 10 posts
        postNum: content.blogPosts.length,
        tagNum: Object.keys(blogTags).length,
        BlogCategories: categoryCountArray,
      })
      // 分类的路由-----start
      checkYaml(categoriesYaml, categoryCountArray, blogTags)
      const friendsJsonPath = await createData(
        'blog-categories.json',
        JSON.stringify(categoryCountArray),
      )
      // 分类页路由/blog/categories
      addRoute({
        path: '/blog/categories',
        component: '@site/src/components/BlogCategories/BlogCategoriesList.js',
        modules: {
          // propName -> JSON file path
          friends: friendsJsonPath,
        },
        exact: true,
      })
      //
      const BlogCategories = getBlogCategories({
        blogPosts,
        postsPerPageOption,
        blogDescription,
        blogTitle,
        pageBasePath,
      })
      // 创建标签分页路由配置 加路由入口 TODO
      const blogPostsById = _.keyBy(blogPosts, (post) => post.id)// 必须放在createTagPaginatedRoutes前面
      const tagsPaginatedRoutes = Object.values(BlogCategories).flatMap(createTagPaginatedRoutes)
      tagsPaginatedRoutes.forEach(addRoute)// 分类子页路由/blog/categories/XXX
      // 分类的路由-----end 以下是迁移的方法
      /**
       * 根据ID获取博客文章 plugin-content-blog routes.ts
       * @param {string} id - 博客文章ID
       * @returns {BlogPost} - 对应的博客文章对象
       * @throws {Error} - 如果找不到对应ID的博客文章则抛出错误
       */
      function getBlogPostById(id) {
        const blogPost = blogPostsById[id]
        if (!blogPost) {
          throw new Error(`unexpected, can't find blog post id=${id}`)
        }
        return blogPost
      }
      /**
       * 创建博客文章项目模块配置 plugin-content-blog routes.ts
       * @param {string[]} ids - 博客文章ID数组
       * @returns {Object[]} - 文章模块配置数组
       */
      function blogPostItemsModule(ids) {
        return ids.map((id) => {
          return {
            content: {
              __import: true,
              path: getBlogPostById(id).metadata.source,
              query: {
                truncated: true,
              },
            },
          }
        })
      }
      // plugin-content-blog props.ts
      function toTagProp({ blogTagsListPath, tag }) {
        return {
          label: tag.label,
          permalink: tag.permalink,
          description: tag.description,
          allTagsPath: '/' + blogTagsListPath,
          count: tag.items.length,
          unlisted: tag.unlisted,
        }
      }
      /**
       * 为博客标签创建分页路由配置 plugin-content-blog routes.ts createTagPaginatedRoutes 参数 tag: BlogTag
       * @param {BlogTag} tag - 博客标签对象
       * @returns {RouteConfig[]} - 路由配置数组
       */
      function createTagPaginatedRoutes(tag) {
        return tag.pages.map(function (paginated) {
          return {
            path: paginated.metadata.permalink,
            component: '@site/src/components/BlogCategories/BlogTagsPostsPage/index.tsx',
            // component: blogTagsPostsComponent,
            exact: true,
            modules: {
              // sidebar: sidebarModulePath,
              sidebar: null,
              items: blogPostItemsModule(paginated.items),
            },
            props: {
              tag: toTagProp({ tag, blogTagsListPath }),
              listMetadata: paginated.metadata,
            },
          }
        })
      }
      // end
    },
  }
}

module.exports = Object.assign({}, blogPluginExports, {
  default: blogPluginEnhanced,
})
// 自己写的
function putCatToBlogPosts(blogPostsReq) {
  // 统计分类出现次数
  const categoryCount = {}
  blogPostsReq.forEach(post => {
    let normalizedCategories = getCategoriesByfrontMatter(post?.metadata?.frontMatter)
    // 更新统计
    normalizedCategories.forEach(category => {
      categoryCount[category] = (categoryCount[category] || 0) + 1
    })
    const resArr = []
    // map 用in 数组用of
    for (const key of normalizedCategories) {
      resArr[resArr.length] = {
        label: key,
        permalink: '/blog/categories/' + key,
        inline: true,
      }
    }
    post.metadata.categories = resArr
  })
  const categoryCountArray = []
  for (const key in categoryCount) {
    categoryCountArray[categoryCountArray.length] = {
      label: key,
      permalink: '/blog/categories/' + key,
      count: categoryCount[key],
    }
  }
  return [blogPostsReq, categoryCountArray]
}
// blogUtils.getBlogTags 改写
function getBlogCategories({
  blogPosts,
  ...params
}) {
  const groups = groupTaggedItems(
    blogPosts,
    (blogPost) => blogPost.metadata.categories,
  )
  return _.mapValues(groups, ({ tag, items: tagBlogPosts }) => {
    const tagVisibility = getTagVisibility({
      items: tagBlogPosts,
      isUnlisted: (item) => item.metadata.unlisted,
    })
    return {
      inline: tag.inline,
      label: tag.label,
      permalink: tag.permalink,
      description: tag.description,
      items: tagVisibility.listedItems.map((item) => item.id),
      pages: paginateBlogPosts({
        blogPosts: tagVisibility.listedItems,
        basePageUrl: tag.permalink,
        ...params,
      }),
      unlisted: tagVisibility.unlisted,
    }
  })
}
//blogUtils.paginateBlogPosts
export function paginateBlogPosts({
  blogPosts,
  basePageUrl,
  blogTitle,
  blogDescription,
  postsPerPageOption,
  pageBasePath,
}) {
  const totalCount = blogPosts.length
  const postsPerPage = postsPerPageOption === 'ALL' ? totalCount : postsPerPageOption
  const numberOfPages = Math.max(1, Math.ceil(totalCount / postsPerPage))
  const pages = []
  function permalink(page) {
    return page > 0
      ? normalizeUrl([basePageUrl, pageBasePath, `${page + 1}`])
      : basePageUrl
  }
  for (let page = 0; page < numberOfPages; page += 1) {
    pages.push({
      items: blogPosts
        .slice(page * postsPerPage, (page + 1) * postsPerPage)
        .map((item) => item.id),
      metadata: {
        permalink: permalink(page),
        page: page + 1,
        postsPerPage,
        totalPages: numberOfPages,
        totalCount,
        previousPage: page !== 0 ? permalink(page - 1) : undefined,
        nextPage: page < numberOfPages - 1 ? permalink(page + 1) : undefined,
        blogDescription,
        blogTitle,
      },
    })
  }
  return pages
}

function checkYaml(categoriesYaml, categoryCountArray, blogTags) { // blogTags是对象不是数组, 数组用of map用in
  fs.access(categoriesYaml, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(categoriesYaml, '文件不存在,跳过分类检测')
    } else {
      let normalizedCategories = []
      const catYaml = yaml.load(fs.readFileSync(categoriesYaml, 'utf8'))
      // console.log('config', config)
      if (Array.isArray(catYaml)) {
        // 数组：过滤掉无效值并转为字符串
        normalizedCategories = catYaml.filter(cat => cat !== undefined && cat !== null).map(String)
        categoryCountArray.forEach((obj) => {
          let flag = false
          for (const str of normalizedCategories) {
            if (str === obj.label) {
              flag = true
              break
            } else if (obj.label === '未分类' || obj.label === 'Uncategorized') {
              flag = true
              break
            }
          }
          if (!flag) {
            console.warn('\x1b[93m' + '[My WARNING] Category [' + obj.label + '] not defined in ' + categoriesYaml + '\x1b[0m')// 高亮黄色（浅黄）
          }
        })
      }
    }
  })
  // 检测分类大小写
  for (const str1 of categoryCountArray) {
    for (const str2 of categoryCountArray) {
      if (str1.label != str2.label && str1.label.toLowerCase() === str2.label.toLowerCase()) {
        console.warn('\x1b[93m' + '[My WARNING] Same Category exists (case ignored) [' + str1.label + '] and [' + str2.label + ']\x1b[0m')// 高亮黄色（浅黄）
      }
    }
  }
  // 检测标签大小写
  for (const key1 of Object.values(blogTags)) {
    for (const key2 of Object.values(blogTags)) {
      if (key1.label != key2.label && key1.label.toLowerCase() === key2.label.toLowerCase()) {
        console.warn('\x1b[93m' + '[My WARNING] Same Tag exists (case ignored) [' + key1.label + '] and [' + key2.label + ']\x1b[0m')// 高亮黄色（浅黄）
      }
    }
  }
}
