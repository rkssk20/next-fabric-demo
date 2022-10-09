import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { fabric } from 'fabric'

// 画面幅に関するフック
const useScreenWidth = (setCanvas: Dispatch<SetStateAction<fabric.Canvas | undefined>>) => {
  const [defaultWidth, setDefaultWidth] = useState<number | undefined>()

  useEffect(() => {
    const parent = document.querySelector('#stage-parent')
    
    parent && setDefaultWidth(parent.clientWidth);

  }, [document.querySelector('#stage-parent')])

  useEffect(() =>{
    // 画面幅の変更
    const handleResize = () => {
      let timeId

      clearTimeout(timeId)

      // 0.5秒ごと
      timeId = window.setTimeout(() => {
        const parent = document.querySelector('#stage-parent')   

        if(!parent || !defaultWidth) return

        setCanvas(prev => {
          if(!prev) return

          prev.setWidth(
          parent.clientWidth
          ).setHeight(
            parent.clientWidth * 0.5625
          ).setZoom(
            (parent.clientWidth / defaultWidth)
          )

          return prev
        })
      }, 500)
    }

    // 画面幅変更を監視
    window.addEventListener('resize', handleResize)

    return () => {
      // アンマウント時に監視を解除
      window.removeEventListener('resize', handleResize)
    }
  }, [document.querySelector('#stage-parent')])

  return defaultWidth
}

export default useScreenWidth