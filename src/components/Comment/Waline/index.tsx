import React, { useEffect, useRef } from 'react'
import {
  type WalineInstance,
  type WalineInitOptions,
  init,
} from '@waline/client'

import '@waline/client/style'

export type WalineOptions = Omit<WalineInitOptions, 'el'> & { path: string }

export const Waline = (props: WalineOptions) => {
  const walineInstanceRef = useRef<WalineInstance | null>(null)
  const containerRef = React.createRef<HTMLDivElement>()
  props = props.props // 不知道为什么多了一层嵌套
  // console.log('propsprops', props)
  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
    })

    return () => walineInstanceRef.current?.destroy()
  }, [])

  useEffect(() => {
    walineInstanceRef.current?.update(props)
  }, [props])

  return <div ref={containerRef} />
}

export default Waline
