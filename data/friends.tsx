export const Friends: Friend[] = [
  {
    title: '愧怍',
    description: '学而无用，不如学而用之。这里是我在技术领域中努力实践和应用的最佳证明。',
    website: 'https://kuizuo.cn/',
    avatar: 'https://kuizuo.cn/img/logo.webp',
  },
]

export type Friend = {
  title: string
  description: string
  website: string
  avatar?: string
}
