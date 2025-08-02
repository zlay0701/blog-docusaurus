import { useEffect, useRef } from 'react'

export type UtterancesProps = {
  // GitHub仓库地址，格式：用户名/仓库名
  repo: string
  // 评论与页面的关联方式
  issueTerm?: 'pathname' | 'url' | 'title' | 'og:title' | string
  // 评论区主题
  theme?: 'github-light' | 'github-dark' | 'preferred-color-scheme' | 'github-dark-orange' | 'icy-dark' | 'dark-blue' | 'photon-dark'
  // 跨域设置
  crossorigin?: 'anonymous' | ''
}

const UtterancesComments: React.FC<UtterancesProps> = ({
  repo,
  issueTerm = 'pathname',
  theme = 'github-light',
  crossorigin = 'anonymous',
}) => {
  const commentContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 检查是否已存在相同脚本，避免重复加载
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://utteranc.es/client.js"]',
    )

    if (existingScript) {
      // 如果脚本已存在，确保它在正确的容器中
      if (commentContainerRef.current && existingScript.parentNode !== commentContainerRef.current) {
        commentContainerRef.current.appendChild(existingScript)
      }
      return
    }

    // 创建新的script标签
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.crossOrigin = crossorigin
    // console.log('crossorigin', crossorigin)

    // 设置utterances配置参数
    script.setAttribute('repo', repo)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('theme', theme)

    // 将脚本添加到容器
    if (commentContainerRef.current) {
      commentContainerRef.current.appendChild(script)
    }

    // 组件卸载时清理
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [repo, issueTerm, theme, crossorigin])

  return (
    <div ref={commentContainerRef} className="utterances-container">
      {/* 评论区将在这里渲染 */}
    </div>
  )
}

export default UtterancesComments
