import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

type PopupProps = HexColorProps & { setOpen: Dispatch<SetStateAction<boolean>> }

// カラー選択のポップアップ部分
const Popup = ({ value, handle, setOpen }: PopupProps) => {
  const [position, setPosition] = useState('top-0')
  const ref = useRef<HTMLDivElement | null>(null)

  // top-0で要素が完全に表示されていない場合、bottom-0にする
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) { setPosition('bottom-0') }
    }, { threshold: 1 })

    if(ref.current === null) return
    const current = ref.current

    observer.observe(current);

    return () => { observer.unobserve(current) }
  }, [])

  return (
    <div
      className={ `
        absolute
        ${ position }
        bottom-auto
        left-0
        bg-white
        border
        border-ogp-border
        border-solid
        rounded-2xl
        shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]
      ` }
      ref={ ref }
    >
      <div
        className="
          fixed
          top-0
          bottom-0
          left-0
          right-0
        "
        onClick={ () => setOpen(false) }
      />

      <HexColorPicker
        className="m-4"
        color={ value }
        onChange={ handle }
      />
    </div>
  )
}

type HexColorProps = {
  value: string
  handle: (e: string) => void
}

// カラー全体
const HexColor = ({ value, handle }: HexColorProps) => {
  const [open, setOpen] = useState(false)   

  return (
    <div
      className="
        mt-2
        relative
        flex
        items-center
        justify-center
      "
    >
      <button
        className="
          min-w-[64px]
          min-h-[64px]
          border-4
          border-ogp-border
          border-solid
          rounded-2xl
        "
        style={{ backgroundColor: `${ value }` }}
        onClick={ () => setOpen(true) }
      >
        <div
          className="
            w-full
            h-full
            hover:bg-[rgba(229,229,229,0.3)]
            active:bg-[rgba(239,239,239,0.5)]
          "
        />
      </button>

      <div
        className="
          ml-4
          bg-gray-200
          relative
          flex
          items-center
          rounded-xl
          resize-none
          line-break:anywhere
        "
      >
        <p
          className="
            w-6
            absolute
            flex
            items-center
            justify-center
            text-gray-500
            pointer-events-none
          "
        >
          #
        </p>
        
        <HexColorInput
          className='
            w-[calc(100%-80px)]
            py-2
            pr-2
            pl-6
            bg-gray-200
            rounded-xl
          '
          color={ value }
          onChange={ handle }
        />
      </div>

      {
        open &&
        <Popup
          value={ value }
          handle={ handle }
          setOpen={ setOpen }
        />
      }
    </div>
  )
}

export default HexColor