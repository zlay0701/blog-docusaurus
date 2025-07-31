// JSON格式
export const Friends: FLinks[] = [
  {
    FLinksTitle: '博客',
    FLinksDesc: '这是我的博客。',
    visible: true,
    FLinksList: [
      {
        name: '博客首页',
        desc: '你必须很努力,才能看起来毫不费力',
        avatar: '/uploads/favicon-96x96.png',
        link: '/home',
        visible: true,
      },
      {
        name: 'Hexo Next Demo',
        desc: 'Hexo + Next主题演示站点',
        avatar: '/uploads/favicon-96x96_2.png',
        link: 'https://hexo-demo.zlay.fun/',
        visible: true,
      },
    ],
  },
  {
    FLinksTitle: '工具',
    FLinksDesc: '这是我的工具',
    visible: true,
    FLinksList: [
      {
        name: 'hugo Next Demo',
        desc: 'Hugo + NexT主题演示站点',
        avatar: 'https://hugo.zlay.fun/imgs/icons/favicon_32_32_next.png',
        link: 'https://hugo-demo.zlay.fun/',
        visible: true,
      },
    ],
  },
]

export type FLinks = {
  FLinksTitle: string
  FLinksDesc: string
  visible: boolean
  FLinksList?: FLink[]
}

export type FLink = {
  name: string
  desc: string
  avatar: string
  link: string
  visible: boolean
}
