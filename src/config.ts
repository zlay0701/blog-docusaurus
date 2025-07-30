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
}

export const profileConfig: ProfileConfig = {
  name: '素喂',
  bio: '在这里我会分享各类技术栈所遇到问题与解决方案，带你了解最新的技术栈以及实际开发中如何应用，并希望我的开发经历对你有所启发。',
  about: {
    title: '自我介绍',
    url: '/about',
  },
}
