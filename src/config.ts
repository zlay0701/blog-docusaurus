/**
 * 支持的图标包
 * https://icon-sets.iconify.design/logos/
 * https://icon-sets.iconify.design/simple-icons/
 * https://icon-sets.iconify.design/ri/
 * emoji搜索👋👋👋 https://search.emoji6.com/en
 */
import type {
  ExpressiveCodeConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'zlay - 素喂’Blog',
  subtitle: '你必须很努力,才能看起来毫不费力', // 暂未使用
  lang: 'zh-Hans', // 支持语言 https://github.com/facebook/docusaurus/tree/main/packages/docusaurus-theme-translations/locales
  friends: {
    siteInfo: {
      title: '素喂',
      description: '你必须很努力,才能看起来毫不费力',
      website: 'https://zlay.fun/',
      avatar: 'https://zlay.fun/uploads/avatar.gif',
    },
  },
  since: 2016,
  beian: '闽ICP备2020017848号-3',
  beian1: '闽公网安备35021102000847号',
  vendors: '<p style="margin-bottom: 0;">Vercel提供CDN/云资源支持</p>',
}

export const profileConfig: ProfileConfig = {
  heroLabel1: '你好! 我是',
  name: '素喂',
  heroLabel2: '👋',
  heroImg: '/img/hero.svg', // 主页背景图 宽11:高8
  bio: '在这里我会分享各类技术栈所遇到问题与解决方案，带你了解最新的技术栈以及实际开发中如何应用，并希望我的开发经历对你有所启发。',
  about: {
    title: '自我介绍',
    url: '/about',
  },
}
// -------------------------下方代码无需改动
// getCopyright方法无需改动
export function getCopyright(): string {
  let sinceStr = ''
  if (siteConfig.since !== new Date().getFullYear()) {
    sinceStr = siteConfig.since + ' - '
  }
  let beianStr = ''
  let beian1Str = ''
  let beian2Str = ''
  let beianFlag = true
  let beian1Flag = true
  if (siteConfig.beian === undefined || siteConfig.beian === null || siteConfig.beian.trim() === '') {
    beianFlag = false
  }
  if (siteConfig.beian1 === undefined || siteConfig.beian1 === null || siteConfig.beian1.trim() === '') {
    beian1Flag = false
  }
  if (beianFlag) {
    beianStr = `<a href="http://beian.miit.gov.cn/">${siteConfig.beian}</a>`
  }
  if (beian1Flag) {
    if (beianFlag) {
      beian1Str = '&nbsp;&nbsp;'
    }
    beian1Str = beian1Str + `<img style="height:17px;margin: 1px 8px 1px 0;" src="/img/police.png" alt="police" height="20"/>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${siteConfig.beian1.match(/\d+/)?.[0]}" >${siteConfig.beian1}</a>
          `
  }
  if (beianFlag || beian1Flag) {
    beian2Str = `<p style="display: inline-flex; align-items: center;margin-bottom: 0;">
           ${beianStr} ${beian1Str}
        </p>
    `
  }
  return `
        <p style="margin-bottom: 0;">Copyright © ${sinceStr}${new Date().getFullYear()} ❤️ ${profileConfig.name}. Built with <a href='https://docusaurus.io/zh-CN/'>Docusaurus</a></p>
        ${beian2Str}
        ${siteConfig.vendors}
        `
}
// getCopyright2方法无需改动 根据上边的方法删减 去掉了部分内容
export function getCopyright2(): string {
  let sinceStr = ''
  if (siteConfig.since !== new Date().getFullYear()) {
    sinceStr = siteConfig.since + ' - '
  }
  return `Copyright © ${sinceStr}${new Date().getFullYear()} ❤️ ${profileConfig.name}`
}
