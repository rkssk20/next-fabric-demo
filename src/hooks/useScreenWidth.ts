import { useState, useEffect  } from 'react'

// 画面幅に関するフック
const useScreenWidth = () => {
  const [innerWidth, setInnerWidth] = useState<number>()

  useEffect(() =>{
    // 画面幅の変更
    const handleResize = () => {
      let timeId

      clearTimeout(timeId)

      // 0.3秒ごと
      timeId = window.setTimeout(() => {
        setInnerWidth(window.innerWidth)
      }, 300)
    }

    handleResize()

    // 画面幅変更を監視
    window.addEventListener('resize', handleResize)

    return () => {
      // アンマウント時に監視を解除
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return innerWidth
}

export default useScreenWidth