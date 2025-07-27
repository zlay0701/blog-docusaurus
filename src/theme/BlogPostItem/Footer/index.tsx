import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import { useDateTimeFormat } from '@docusaurus/theme-common/internal'
import { Icon } from '@iconify/react'
import { cn } from '@site/src/lib/utils'
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink'
import Tag from '@theme/Tag'
import { ReadingTime } from '../Header/Info/index'
import { getCategoriesByfrontMatter, matchCategories } from '@site/src/plugin/plugin-content-blog/utils'
import { usePluginData } from '@docusaurus/useGlobalData'

import styles from './styles.module.css'

export default function BlogPostItemFooter(): JSX.Element | null {
  const { metadata, isBlogPostPage } = useBlogPost()
  const { tags, title, editUrl, hasTruncateMarker, date, readingTime, authors, frontMatter } = metadata

  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const formatDate = (blogDate: string) => dateTimeFormat.format(new Date(blogDate))

  // A post is truncated if it's in the "list view" and it has a truncate marker
  const truncatedPost = !isBlogPostPage && hasTruncateMarker

  const tagsExists = tags.length > 0
  const authorsExists = authors.length > 0

  const blogCategories = getCategoriesByfrontMatter(frontMatter)
  const categoriesExists = blogCategories.length > 0
  const allCategories = usePluginData('docusaurus-plugin-content-blog').BlogCategories
  const categoriesUrls = matchCategories(allCategories, blogCategories)
  // console.log('categories', getCategoriesByfrontMatter(frontMatter))
  // console.log('categories1', categoriesUrls)

  const renderFooter = isBlogPostPage

  if (!renderFooter) {
    return (
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.blogPostInfo}>
          {/* {authorsExists && (
            <>
              <Icon icon="ri:user-line"  />
              {authors.map(a => (
                <span key={a.url} className="blog__author">
                  <a href={a.url} className={styles.blogPostAuthor}>
                    {a.name}
                  </a>
                </span>
              ))}
            </>
          )} */}
          {date && (
            <>
              <Icon icon="ri:calendar-line" />
              <time dateTime={date} itemProp="datePublished">
                {formatDate(date)}
              </time>
            </>
          )}
          {categoriesExists && (
            <>
              <Icon icon="ri:table-2" />
              <span className={styles.blogPostInfoTags}>
                {categoriesUrls.map(({ label, permalink: tagPermalink, description }) => (
                  <Tag label={label} permalink={tagPermalink} key={tagPermalink} description={description} />
                ))}
              </span>
            </>
          )}
          {tagsExists && (
            <>
              <Icon icon="ri:price-tag-3-line" />
              <span className={styles.blogPostInfoTags}>
                {tags.map(({ label, permalink: tagPermalink, description }) => (
                  <Tag label={label} permalink={tagPermalink} key={tagPermalink} description={description} />
                ))}
              </span>
            </>
          )}
          {readingTime && (
            <>
              <Icon icon="ri:time-line" />
              <span className={cn(styles.blogPostReadTime, 'blog__readingTime')}>
                <ReadingTime readingTime={readingTime} />
              </span>
            </>
          )}
          {truncatedPost && (
            <div
              className={cn(
                'flex flex-1 items-center justify-end gap-0.5 font-medium text-[var(--ifm-link-color)] opacity-0 transition-opacity duration-200 group-hover/blog:opacity-100',
                {
                  'col--3': tagsExists,
                },
              )}
            >
              <ReadMoreLink blogPostTitle={title} to={metadata.permalink} className="hover:no-underline" />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <footer className={cn('row docusaurus-mt-lg', isBlogPostPage && styles.blogPostFooterDetailsFull)}>
      {/* {isBlogPostPage && editUrl && (
        <div className="col margin-top--sm">
          <EditThisPage editUrl={editUrl} />
        </div>
      )} */}

      {truncatedPost && (
        <div
          className={cn('col text--right', {
            'col--3': tagsExists,
          })}
        >
          <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
        </div>
      )}
    </footer>
  )
}
