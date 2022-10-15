import { useState, useEffect  } from 'react'

// 画面幅に関するフック
const useScreenWidth = (canvas: fabric.Canvas | undefined) => {
  useEffect(() =>{
    // 画面幅の変更
    const handleResize = () => {
      let timeId

      clearTimeout(timeId)

      // 0.5秒ごと
      timeId = window.setTimeout(() => {
        const parent = document.querySelector('#stage-parent')   

        if(!parent || !canvas) return

        const width = parent.clientWidth

        canvas.setZoom(
          canvas.width ? (width / canvas.width) * canvas.getZoom() : 1
        ).setWidth(
          width
        ).setHeight(
          width * 0.5625
        ).renderAll()
      }, 500)
    }

    handleResize()

    // 画面幅変更を監視
    window.addEventListener('resize', handleResize)

    return () => {
      // アンマウント時に監視を解除
      window.removeEventListener('resize', handleResize)
    }
  }, [canvas])
}

export default useScreenWidth