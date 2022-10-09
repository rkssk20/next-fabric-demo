import { useState, useEffect } from "react"
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

const Fonts = ({ selectKey }: { selectKey: string }) => {
  const [value, setValue] = useState('')
  const [list, setList] = useState(fonts.slice(0, 10))

  useEffect(() => {
    setValue('')
  }, [selectKey])

  // フォントの無限スクロール
  const handleMore = () => { 
    setList(prev => [
      ...prev,
      ...fonts.slice(prev.length, prev .length+ 10)
    ])
  }
  
  const setTargetRef = useIntersectionObserver(handleMore)

  // フォント変更
  const handleFont = (fontFamily: string) => {    
    setValue(fontFamily)
    // @ts-ignore
    Konva.shapes[selectKey].fontFamily(fontFamily)
  }

  return (
    <div className="mx-2 flex-1 overflow-y-scroll">
      {
        list.map((item, index) => (
          <Font
            key={ item }
            setTargetRef={ ((list.length -2) === index) ? setTargetRef : undefined }
            fontFamily={ item }
            handleFont={ handleFont }
          />
        ))
      }
    </div>
  )
}

export default Fonts