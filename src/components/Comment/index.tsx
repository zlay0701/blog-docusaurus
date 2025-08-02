import BrowserOnly from '@docusaurus/BrowserOnly'
import type { ThemeConfig } from '@docusaurus/preset-classic'
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import GiscusComment from '@site/src/components/Comment/Giscus'
import type { GiscusConfig } from '@site/src/components/Comment/Giscus'
// frontMatter 可能不存在
export default function Comment({ frontMatter }: { frontMatter: { [key: string]: unknown } }): JSX.Element {
  const themeConfig = useThemeConfig() as ThemeConfig & { giscus: GiscusConfig }
  const { i18n } = useDocusaurusContext()
  console.log('themeConfig', frontMatter)
  console.log('i18n', i18n)
  const commentsArr = themeConfig.comments
  for (const str of commentsArr) {
    if (str.toLowerCase() === 'Giscus'.toLowerCase()) {
      return <GiscusComment />
    }
  }
}
