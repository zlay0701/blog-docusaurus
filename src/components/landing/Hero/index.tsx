import { type Variants, motion } from 'framer-motion'

import Translate from '@docusaurus/Translate'
import { profileConfig } from '../../../config'

import SocialLinks from '@site/src/components/SocialLinks'
import { MovingButton } from '../../magicui/moving-border'
import styles from './styles.module.css'

const variants: Variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
}

function Circle() {
  return <div className={styles.circle} />
}

function Name() {
  return (
    <motion.div
      className={styles.hero_text}
      custom={1}
      initial="hidden"
      animate="visible"
      variants={variants}
      onMouseMove={(e) => {
        e.currentTarget.style.setProperty('--x', `${e.clientX}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY}px`)
      }}
    >
      <Translate id="homepage.hero.greet">{profileConfig.heroLabel1}</Translate>
      <span
        className={styles.name}
        onMouseMove={(e) => {
          const bounding = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mouse-x', `${bounding.x}px`)
          e.currentTarget.style.setProperty('--mouse-y', `${bounding.y}px`)
        }}
      >
        <Translate id="homepage.hero.name">{profileConfig.name}</Translate>
      </span>
      <span className="ml-1">{profileConfig.heroLabel2}</span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <motion.div className={styles.hero}>
      <div className={styles.intro}>
        <Name />
        <motion.p custom={2} initial="hidden" animate="visible" variants={variants} className="max-lg:px-4">
          <Translate id="homepage.hero.text">
            {profileConfig.bio}
          </Translate>
        </motion.p>
        <motion.div custom={3} initial="hidden" animate="visible" variants={variants}>
          <SocialLinks />
        </motion.div>

        <motion.div className="mt-4 flex gap-2" custom={4} initial="hidden" animate="visible" variants={variants}>
          <MovingButton
            borderRadius="1.25rem"
            className="relative z-10 flex items-center rounded-2xl border border-solid border-neutral-200 bg-background px-5 py-3 text-center text-base font-semibold dark:border-neutral-800"
          >
            <a href={profileConfig.about.url} className="font-semibold">
              <Translate id="hompage.hero.introduce">{profileConfig.about.title}</Translate>
            </a>
          </MovingButton>
        </motion.div>
      </div>
      <motion.div className={styles.background}>
        <img src={profileConfig.heroImg} width='95%' height='auto' alt=''></img>
        <Circle />
      </motion.div>
    </motion.div>
  )
}
