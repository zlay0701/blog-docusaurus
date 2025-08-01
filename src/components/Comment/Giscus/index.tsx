import BrowserOnly from '@docusaurus/BrowserOnly'
import type { ThemeConfig } from '@docusaurus/preset-classic'
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Giscus, { type GiscusProps, type Theme } from '@giscus/react'

export type GiscusConfig = GiscusProps & { darkTheme: Theme }

const defaultConfig: Partial<GiscusProps> & { darkTheme: string } = {
  id: 'comments',
  mapping: 'title',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  lang: 'zh-CN',
  theme: 'light',
  darkTheme: 'dark_dimmed',
}

export default function GiscusComment(): JSX.Element {
  const themeConfig = useThemeConfig() as ThemeConfig & { giscus: GiscusConfig }
  const { i18n } = useDocusaurusContext()

  // merge default config
  const giscus = { ...defaultConfig, ...themeConfig.giscus }

  if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
    throw new Error('You must provide `repo`, `repoId`, and `categoryId` to `themeConfig.giscus`.')
  }

  giscus.theme = useColorMode().colorMode === 'dark' ? giscus.darkTheme : giscus.theme
  giscus.lang = i18n.currentLocale

  return <BrowserOnly fallback={<div>Loading Comments...</div>}>{() => <Giscus {...giscus} />}</BrowserOnly>
}
