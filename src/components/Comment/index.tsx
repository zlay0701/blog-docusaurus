import BrowserOnly from '@docusaurus/BrowserOnly'
import type { ThemeConfig } from '@docusaurus/preset-classic'
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import GiscusComment from '@site/src/components/Comment/Giscus'
import UtterancesComments from '@site/src/components/Comment/Utterances'
import Waline from '@site/src/components/Comment/Waline'
import type { GiscusConfig } from '@site/src/components/Comment/Giscus'
/**
 * frontMatter 可能不存在 增加不展示评论校验
 * 支持格式
comments: false

comment:
  enable: false

comment: false

hide_comment: true
 */
export default function Comment({ frontMatter }: { frontMatter: { [key: string]: unknown } }): JSX.Element {
  const themeConfig = useThemeConfig() as ThemeConfig & { giscus: GiscusConfig }
  const { i18n } = useDocusaurusContext()
  console.log('themeConfig', frontMatter)
  console.log('i18n', i18n)
  const commentsArr = themeConfig.comments
  const utterancesProps = themeConfig.utterances
  const walineProps = themeConfig.waline
  // console.log('walineProps', walineProps)
  let GiscusFlag = false
  let utterancesFlag = false
  let walineFlag = false
  // 增加不展示校验
  for (const str of commentsArr) {
    if (str.toLowerCase() === 'Giscus'.toLowerCase()) {
      GiscusFlag = true
    }
    if (str.toLowerCase() === 'utterances'.toLowerCase()) {
      utterancesFlag = true
    }
    if (str.toLowerCase() === 'waline'.toLowerCase()) {
      walineFlag = true
    }
  }
  return (
    <>
      {GiscusFlag && (
        <>
          <GiscusComment />
          <GradientDivider />
        </>
      )}
      {utterancesFlag && (
        <>
          <UtterancesComments repo={utterancesProps.repo} issueTerm={utterancesProps.issueTerm} theme={utterancesProps.theme} />
          <GradientDivider />
        </>
      )}
      {walineFlag && (
        <>
          <Waline props={walineProps} />
          <GradientDivider />
        </>
      )}
    </>
  )
}
// JSX 格式的渐变分割线
const GradientDivider = () => (
  <hr
    style={{
      border: 'none',
      height: '3px',
      background: 'linear-gradient(to right, transparent, #333, transparent)',
    }}
  />
)
