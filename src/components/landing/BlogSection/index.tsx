import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import type { BlogPost } from '@docusaurus/plugin-content-blog'
import { usePluginData } from '@docusaurus/useGlobalData'
import { cn } from '@site/src/lib/utils'
import { siteConfig } from '@site/src/config'
import Image from '@theme/IdealImage'
import { motion, useScroll, useTransform } from 'framer-motion'
import React from 'react'
import { Section } from '../Section'
import { useDateTimeFormat } from '@docusaurus/theme-common/internal'
import { Icon } from '@iconify/react'

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))

const BLOG_POSTS_COUNT = 6
const BLOG_POSTS_PER_ROW = 2

export function BlogItem({ post }: { post: BlogPost }) {
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const formatDate = (blogDate: string) => dateTimeFormat.format(new Date(blogDate))
  const {
    metadata: { permalink, frontMatter, title, description, date },
  } = post
  let image = frontMatter.image
  image = image ? image : siteConfig.defaultPostImage // 给默认图片
  return (
    <motion.li
      className={cn('card', 'margin-bottom--md flex w-full bg-blog shadow-blog')}
      key={permalink}
      initial={{ y: 100, opacity: 0.001 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      viewport={{ once: true }}
    >
      {image && (
        <Link href={permalink} className="max-h-[240px] w-full cursor-pointer overflow-hidden object-cover">
          <Image src={image} alt={title} img=""
            style={{
              WebkitMaskImage: 'linear-gradient(180deg, #fff -17.19%, #00000000 92.43%)',
              maskImage: 'linear-gradient(180deg, #fff -17.19%, #00000000 92.43%)',
            }}/>
        </Link>
      )}
      <div className="card__body" 
        style={{
          backdropFilter: `blur(1px)`,
          marginTop: '-120px',
        }}>
        <h4 className="text-base">
          <Link href={permalink} className="relative hover:no-underline">
            {title}
          </Link>
        </h4>
        <p className="text-sm" 
          style={{
            marginBottom: '0px',
            maxHeight: `4em`,
            overflow: `hidden`,
          }}>{description}</p>
        <Icon icon="ri:calendar-line" style={{ marginBottom: '-2px', width: '12px', height: '12px' }} />
        <time dateTime={date} itemProp="datePublished" style={{ fontSize: '12px', color: '#555555' }}>
          &nbsp;{formatDate(date)}
        </time>
      </div>
    </motion.li>
  )
}

export default function BlogSection(): JSX.Element {
  const blogData = usePluginData('docusaurus-plugin-content-blog') as {
    posts: BlogPost[]
    postNum: number
    tagNum: number
  }

  const posts = chunk(blogData.posts.slice(0, BLOG_POSTS_COUNT), BLOG_POSTS_PER_ROW)

  const ref = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20], {
    clamp: false,
  })

  if (blogData.postNum === 0) {
    return <>作者还没开始写博文哦...</>
  }

  return (
    <Section title={<Translate id="homepage.blog.title">近期博客</Translate>} icon="ri:quill-pen-line" href="/blog">
      <div ref={ref} className="flex flex-col gap-4 overflow-hidden rounded-card p-3 md:grid md:grid-cols-12">
        {posts.map((postGroup, index) => (
          <div className="col-span-4" key={index}>
            {postGroup.map((post, i) => (
              <motion.div style={{ y: i / 2 ? y : 0 }} key={i}>
                <BlogItem key={post.id} post={post} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </Section>
  )
}
