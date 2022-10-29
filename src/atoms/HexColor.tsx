import { useState, useEffect, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

type ColorPickerProps = HexColorProps & {
  setOpen: Dispatch<SetStateAction<boolean>>
  position: PositionState
  setPosition: Dispatch<SetStateAction<PositionState | null>>
}

// ポップアップのメイン要素
const ColorPicker = ({ value, handle, setOpen, position, setPosition }: ColorPickerProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    // 外側のクリックを検知してポップアップを閉じる
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    // 要素が画面外の時、画面内に配置する
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setPosition(prev => {
          if(!prev) return null

          return {
            left: prev.left,
            bottom: '0px'
          }
        })
      }
    }, { threshold: 1 })

    if(ref.current === null) return
    const current = ref.current
    observer.observe(current);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      observer.unobserve(current)
    }

  }, [])

  return (
    <div
      className="
        absolute
        bg-white
        border
        border-ogp-border
        border-solid
        rounded-2xl
        shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]
        z-10
      "
      style={ position }
      ref={ ref }
    >
      <HexColorPicker
        className="m-4"
        color={ value }
        onChange={ handle }
      />
    </div>
  )
}

type PopupProps = HexColorProps & {
  setOpen: Dispatch<SetStateAction<boolean>>
  buttonRef: MutableRefObject<HTMLButtonElement | null>
}

type PositionState = {
  top?: string
  bottom?: string
  left: string
}

// カラー選択のポップアップ部分
const Popup = ({ value, handle, setOpen, buttonRef }: PopupProps) => {
  const [position, setPosition] = useState<PositionState | null>(null)

  useEffect(() => {
    const rect = buttonRef.current?.getBoundingClientRect()
  
    if(!rect) return
  
    setPosition({
      top: rect.top + 'px',
      left: rect.left + 'px'
    })
  }, [])

  return (
    <div className="absolute inset-0">
      {
        position &&
        <ColorPicker
          value={ value }
          handle={ handle }
          setOpen={ setOpen }
          position={ position }
          setPosition={ setPosition}
        />
      }
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
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  return (
    <div
      className="
        mt-2
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
        style={{ backgroundColor: value }}
        ref={ buttonRef }
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
            w-full
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
          buttonRef={ buttonRef }
        />
      }
    </div>
  )
}

export default HexColor