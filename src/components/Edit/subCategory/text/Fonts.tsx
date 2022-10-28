import { useState, useEffect } from "react"
import { fabric } from "fabric"
import WebFont from "webfontloader"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import Font from "@/atoms/Font"

const fonts = [
  'BIZ UDGothic',
  'BIZ UDMincho',
  'BIZ UDPGothic',
  'BIZ UDPMincho',
  'Dela Gothic One',
  'DotGothic16',
  'Hachi Maru Pop',
  'Hina Mincho',
  'Kaisei Decol',
  'Kaisei HarunoUmi',
  'Kaisei Opti',
  'Kaisei Tokumin',
  'Kiwi Maru',
  'Klee One',
  'Kosugi',
  'Kosugi Maru',
  'M PLUS 1',
  'M PLUS 1 Code',
  'M PLUS 1p',
  'M PLUS 2',
  'M PLUS Rounded 1c',
  'Mochiy Pop One',
  'Mochiy Pop P One',
  'Murecho',
  'New Tegomin',
  'Noto Sans JP',
  'Noto Serif JP',
  'Potta One',
  'Rampart One',
  'Reggae One',
  'RocknRoll One',
  'Sawarabi Gothic',
  'Sawarabi Mincho',
  'Shippori Antique',
  'Shippori Antique B1',
  'Shippori Mincho',
  'Shippori Mincho B1',
  'Stick',
  'Train One',
  'Yomogi',
  'Yuji Boku',
  'Yuji Mai',
  'Yuji Syuku',
  'Yusei Magic',
  'Zen Antique',
  'Zen Antique Soft',
  'Zen Kaku Gothic Antique',
  'Zen Kaku Gothic New',
  'Zen Kurenaido',
  'Zen Maru Gothic',
  'Zen Old Mincho'
]

const Fonts = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [value, setValue] = useState('')
  const [list, setList] = useState(fonts.slice(0, 10))

  useEffect(() => {
    activeObject.fontFamily && setValue(activeObject.fontFamily)
  }, [activeObject])

  // フォントの無限スクロール
  const handleMore = () => { 
    setList(prev => [
      ...prev,
      ...fonts.slice(prev.length, prev .length+ 10)
    ])
  }
  
  const setTargetRef = useIntersectionObserver(handleMore)

  useEffect(() => {
    if(value === '' || value === 'Noto Sans JP') return
  
    WebFont.load({
      google: {
        families: [value]
      },
      // 読み込み時
      loading: () => {
        activeObject.set({
          opacity: 0
        })
        activeObject.canvas?.renderAll()
      },
      // 完了時
      active: () => {
        activeObject.set({
          fontFamily: value,
          opacity: 1
        })
        activeObject.canvas?.renderAll()
      },
      // 失敗時
      inactive: () => {        
        activeObject.set({
          opacity: 1
        })
        activeObject.canvas?.renderAll()
      }
    })
  }, [value])

  // フォント変更
  const handleFont = (fontFamily: string) => {    
    setValue(fontFamily)
  }

  return (
    <div className="py-6 px-4 overflow-y-scroll">
      {
        list.map((item, index) => (
          <Font
            key={ item }
            setTargetRef={ ((list.length -2) === index) ? setTargetRef : undefined }
            fontFamily={ item }
            disabled={ item === value }
            handleFont={ handleFont }
          />
        ))
      }
    </div>
  )
}

export default Fonts