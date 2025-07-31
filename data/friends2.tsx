//
export const Friends: FLinks[] = [
  {
    FLinksTitle: '分类一',
    FLinksDesc: '副标题',
    visible: true,
    FLinksList: [
      {
        name: '知了(zhile.io)',
        desc: '朝闻道，夕可眠矣。',
        avatar: '/uploads/favicon-96x96_2.png',
        link: 'https://zhile.io/',
        visible: true,
      },
      {
        name: 'Lippi-浮生志',
        desc: 'Web后台开发、Android应用开发爱好者',
        avatar: 'https://avatars.githubusercontent.com/u/5326814?s=48&v=4',
        link: 'https://ezlippi.github.io/',
        visible: true,
      },
    ],
  },
  {
    FLinksTitle: '分类二',
    FLinksDesc: '副标题',
    visible: true,
    FLinksList: [
      {
        name: '七夏浅笑',
        desc: '七月之约，夏末浅笑 _',
        avatar: '/uploads/favicon-96x96_2.png',
        link: 'https://www.julydate.com/',
        visible: true,
      },
      {
        name: 'yiyun\'s Blog',
        desc: '愚蠢的是我',
        avatar: 'https://moeci.com/images/favicon-32x32-next.png',
        link: 'https://moeci.com/',
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
