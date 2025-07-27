import React from 'react'
import { HtmlClassNameProvider, PageMetadata, ThemeClassNames, translateTagsPageTitle } from '@docusaurus/theme-common'
import { Icon } from '@iconify/react'
import { cn } from '@site/src/lib/utils'
import SearchMetadata from '@theme/SearchMetadata'
import TagsListByLetter from './TagsListByLetter'
import { useState } from 'react'
import { TagsListByFlat } from '/src/theme/TagsListByLetter'
import MyLayout from '/src/theme/MyLayout'

export default function FriendsComponent({friends}) {
  const title = '分类'
  const [type, setType] = useState < 'list' | 'grid' > ('list')
  return (
    <HtmlClassNameProvider className={cn(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogTagsListPage)}>
    <PageMetadata title={title} />
    <SearchMetadata tag="blog_tags_list" />
    <MyLayout>
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            }}
        >
        <h1>{title}</h1>
          <span className="flex">
            <Icon
              icon="ph:list"
              width="24"
              height="24"
              onClick={() => setType('list')}
              color={type === 'list' ? 'var(--ifm-color-primary)' : '#ccc'}
            />
            <Icon
            icon="ph:grid-four"
            width="24"
            height="24"
            onClick={() => setType('grid')}
            color={type === 'grid' ? 'var(--ifm-color-primary)' : '#ccc'}
            />
        </span>
        </div>
        {type === 'list' && <TagsListByLetter tags={friends} />}
        {type === 'grid' && <TagsListByFlat tags={friends} />}
    </MyLayout>
    </HtmlClassNameProvider>
    )
}