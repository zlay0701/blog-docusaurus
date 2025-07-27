/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
// import {listTagsByLetters, type TagLetterEntry} from '@docusaurus/theme-common';
import Tag from '@theme/Tag';
import type {Props} from '@theme/TagsListByLetter';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function TagLetterEntryItem({letterEntry}: {letterEntry: TagLetterEntry}) {
  return (
    <article>
      <Heading as="h2" id={letterEntry.letter}>
        {letterEntry.letter}
      </Heading>
      <ul className="padding--none">
        {letterEntry.tags.map((tag) => (
          <li key={tag.permalink} className={styles.tag}>
            <Tag {...tag} />
          </li>
        ))}
      </ul>
      <hr />
    </article>
  );
}

export default function TagsListByLetter({tags}: Props): ReactNode {
  // console.log('tags1', tags)
  const letterList = listTagsByLetters(tags);
  // console.log('tags2', JSON.stringify(letterList))
  return (
    <section className="margin-vert--lg">
      {letterList.map((letterEntry) => (
        <TagLetterEntryItem
          key={letterEntry.letter}
          letterEntry={letterEntry}
        />
      ))}
    </section>
  );
}
/**
 * 将标签按首字母分组并排序 迁移过来的
 * @param {Array<{label: string, permalink: string, count: number}>} tags - 标签列表
 * @returns {Array<{letter: string, tags: Array<{label: string, permalink: string, count: number}>}>} - 按字母分组的标签
 */
export function listTagsByLetters(tags) {
  const groups = {}
  tags.forEach((tag) => {
    const initial = getTagLetter(tag.label)
    groups[initial] = groups[initial] || []
    groups[initial].push(tag)
  })
  return Object.entries(groups)
    // 按字母排序
    .sort(([letter1], [letter2]) => letter1.localeCompare(letter2))
    .map(([letter, letterTags]) => {
      // 在每个字母组内按标签名排序
      const sortedTags = [...letterTags].sort((tag1, tag2) =>
        tag1.label.localeCompare(tag2.label),
      )
      return { letter, tags: sortedTags }
    })
}
// 迁移过来的
function getTagLetter(tag) {
  return tag[0]!.toUpperCase()
}
