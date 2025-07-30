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
  subtitle: '你必须很努力,才能看起来毫不费力',
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
