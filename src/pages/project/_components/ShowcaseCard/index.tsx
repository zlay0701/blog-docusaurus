import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import { type Project, type Tag, TagList, type TagType, Tags } from '@site/data/projects'
import Tooltip from '@site/src/components/Tooltip'
import { MagicCard } from '@site/src/components/magicui/magic-card'
import FavoriteIcon from '@site/src/components/svgIcons/FavoriteIcon'
import { cn } from '@site/src/lib/utils'
import { sortBy } from '@site/src/utils/jsUtils'
import Image from '@theme/IdealImage'
import React, { memo } from 'react'
import styles from './styles.module.css'

const TagComp = React.forwardRef<HTMLLIElement, Tag>(({ label, color, description }, ref) => (
  <li ref={ref} className={styles.tag} title={description}>
    <span className={styles.textLabel}>{label.toLowerCase()}</span>
    <span className={styles.colorLabel} style={{ backgroundColor: color }} />
  </li>
))

function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
  const tagObjects = tags.map(tag => ({ tag, ...Tags[tag] }))

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, tagObject => TagList.indexOf(tagObject.tag))

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `showcase_card_tag_${tagObject.tag}`

        return (
          <Tooltip key={index} text={tagObject.description} anchorEl="#__docusaurus" id={id}>
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        )
      })}
    </>
  )
}

const ShowcaseCard = memo(({ project }: { project: Project }) => {
  return (
    <MagicCard key={project.title} className={cn('card', styles.showcaseCard)}>
      {project.preview && (
        <div className={cn('card__image', styles.showcaseCardImage)}
          style={{
            borderBottom: `0px solid var(--ifm-color-emphasis-200)`,
          }}>
          <Image src={project.preview} alt={project.title} img={project.preview} 
            style={{
              WebkitMaskImage: 'linear-gradient(180deg, #fff -17.19%, #00000000 92.43%)',
              maskImage: 'linear-gradient(180deg, #fff -17.19%, #00000000 92.43%)',
            }}/>
        </div>
      )}
      <div className="card__body"
        style={{
          backdropFilter: `blur(1px)`,
          marginTop: `${project.preview ? '-80px' : '0px'}`,
        }}>
        <div className={cn(styles.showcaseCardHeader)}>
          <h4 className={styles.showcaseCardTitle}>
            <Link href={project.website}>{project.title}</Link>
          </h4>
          {project.tags.includes('favorite') && <FavoriteIcon svgClass={styles.svgIconFavorite} size="small" />}
          {project.source && (
            <Link
              href={project.source}
              className={cn('button button--secondary button--sm', styles.showcaseCardSrcBtn)}
            >
              <Translate id="showcase.card.sourceLink">源码</Translate>
            </Link>
          )}
        </div>
        <p className={styles.showcaseCardBody}>{project.description}</p>
      </div>
      <ul className={cn('card__footer', styles.cardFooter)}
        style={{
          backdropFilter: `blur(1px)`,
        }}>
        <ShowcaseCardTag tags={project.tags} />
      </ul>
    </MagicCard>
  )
})

export default ShowcaseCard
