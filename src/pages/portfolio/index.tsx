import CodeBlock from '@theme/CodeBlock'
import Layout from '@theme/Layout'
import { memo, useRef } from 'react'
import { siteConfig } from '../../config'

import type { portfolio, github, repoT } from '@site/data/portfolio'
import { Friends } from '@site/data/portfolio'

import Link from '@docusaurus/Link'
import { motion } from 'framer-motion'
import styles from './styles.module.css'

const TITLE = '作品集'
const DESCRIPTION = '一些小工具'
const ADD_FRIEND_URL = 'https://github.com/kuizuo/blog/edit/main/data/friends.tsx'

const friends = Friends

function FriendHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text-center">
      <h1>{TITLE}</h1>
      <p style={{
        fontStyle: 'italic',
      }}
      >
        {DESCRIPTION}
      </p>
      {/* <a className="button button--primary" href={ADD_FRIEND_URL} target="_blank" rel="noreferrer">
        🔗 申请友链
      </a> */}
    </section>
  )
}
function Overview() {
  return (
    <section className="margin-top--lg margin-bottom--lg text-center">
      <h2 style={{
        fontSize: 20,
        fontWeight: 'blod',
      }}
      >
        {Friends.FLinksTitle}
      </h2>
      <h3 style={{
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'normal',
      }}
      >
        {friends.FLinksDesc}
      </h3>
      {friends.visible && ( // 包裹在 JSX 表达式中
        <a
          target="_blank"
          rel="noopener noreferrer" // 补充 noreferrer 增强安全性
          href={friends.link} // 修正变量引用方式
        >
          <img
            align="center"
            src={`${friends.serverUrl}${friends.statsLink}&bg_color=${friends.bgColor}`} // 模板字符串拼接
            alt={friends.FLinksTitle} // 修正变量引用方式
            style={{ marginBottom: '0px' }}
          />
        </a>
      )}
    </section>
  )
}
function FriendCard({ friend }: { friend: repoT }) {
  if (friend.repo) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer" // 补充 noreferrer 增强安全性
        href={`https://github.com/${friend.username}/${friend.repo}`} // 修正变量引用方式
      >
        <img
          align="center"
          src={`${Friends.serverUrl}/api/pin/?username=${friend.username}&repo=${friend.repo}&show_owner=${Friends.showOwner}&bg_color=${Friends.bgColor}`} // 模板字符串拼接
          alt={friend.name} // 修正变量引用方式
          style={{ marginBottom: '0px' }}
        />
      </a>
    )
  }
  else {
    return (
      <li className="rounded-card bg-card relative flex min-h-24 cursor-pointer flex-row items-center overflow-hidden px-4 py-1 transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.01] hover:bg-[rgba(229,231,235,0.3)] hover:shadow-[0_3px_10px_0_rgba(164,190,217,0.3)]">
        <img
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          src={typeof friend.avatar === 'string' ? friend.avatar : ''}
          alt={friend.name}
          className="size-16 min-w-16 rounded-full object-contain"
        />
        <div className="pl-4">
          <div className="mb-1 flex items-center">
            <h4 className="mb-0 flex-1">
              <Link
                to={friend.link}
                rel=""
                className="from-ifm-color-primary to-ifm-color-primary bg-gradient-to-b bg-[length:0%_1px] bg-[0%_100%] bg-no-repeat no-underline transition-[background-size] duration-200 ease-out hover:bg-[length:100%_1px] focus:bg-[length:100%_1px]"
              >
                {friend.name}
              </Link>
            </h4>
          </div>
          <p className="m-0 line-clamp-2 w-full overflow-hidden text-sm leading-[1.66]">{friend.desc}</p>
        </div>
      </li>
    )
  }
}

function FriendCards({ friend }: { friend: github }) {
  return (
    <section className="my-8">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <h2 style={{
          fontSize: 20,
          fontWeight: 'blod',
        }}
        >
          {friend.title}
        </h2>
        <h3 style={{
          fontSize: 16,
          fontStyle: 'italic',
          fontWeight: 'normal',
        }}
        >
          {friend.desc}
        </h3>
        <ul className="grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {friend.repoList.map(fri => (
            fri.visible && <FriendCard friend={fri} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function FriendLink(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Layout title={TITLE} description={DESCRIPTION} wrapperClassName="bg-background">
      <motion.main ref={ref} className="my-4">
        <FriendHeader />
        <Overview />
        {friends.githubList.map(friend => (
          friend.visible ? <FriendCards friend={friend} /> : null
        ))}
      </motion.main>
    </Layout>
  )
}
