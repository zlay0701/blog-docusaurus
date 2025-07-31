// JSON格式
export const Friends: portfolio = {
  FLinksTitle: 'Github总览',
  FLinksDesc: '副标题',
  link: 'https://github.com/zlay0701',
  statsLink: '/api?username=zlay0701&show_icons=true&icon_color=0366d6&hide_title=true&hide=contribs&include_all_commits=true&count_private=true',
  serverUrl: 'https://github-readme-stats.zlay.fun',
  showOwner: true,
  bgColor: 'F5F5F5',
  visible: true,
  githubList: [
    {
      title: '学习',
      desc: '学习相关',
      visible: true,
      repoList: [
        {
          name: 'Hugo Next Demo',
          username: 'zlay0701',
          repo: 'hugo-demo',
          visible: true,
        },
        {
          name: '非Github仓库示例',
          desc: '也支持非Github仓库显示',
          avatar: '/uploads/favicon-96x96_2.png',
          link: 'https://hexo-demo.zlay.fun/',
          visible: true,
        },
      ],
    },
    {
      title: '工具',
      desc: '一些工具',
      visible: true,
      repoList: [
        {
          name: 'Hexo Next Demo',
          username: 'zlay0701',
          repo: 'hexo-demo',
          visible: true,
        },
      ],
    },
  ],
}

export type portfolio = {
  FLinksTitle: string
  FLinksDesc: string
  link: string
  statsLink: string
  serverUrl: string
  showOwner: boolean
  bgColor: string
  visible: boolean
  githubList: github[]
}

export type github = {
  title: string
  desc: string
  visible: boolean
  repoList: repoT[]
}

export type repoT = {
  name: string
  desc?: string
  username?: string
  repo?: string
  avatar?: string
  link?: string
  visible: boolean
}
