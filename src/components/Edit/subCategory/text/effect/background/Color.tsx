import type { Dispatch, SetStateAction } from 'react'
import { ColorState } from '@/types/type'
import HEXtoRGB from '@/lib/HEXtoRGB'
import HexColor from '@/atoms/HexColor'

type Props = {
  color: ColorState
  setColor: Dispatch<SetStateAction<ColorState | null>>
  opacity: number
  activeObject: fabric.Text
}

const Color = ({ color, setColor, opacity, activeObject }:Props) => {
  const handleColor = (e: string) => {
    const rgb = HEXtoRGB(e)

    setColor({
        hex: e,
        rgb
    })

    activeObject.set({
      textBackgroundColor: `rgba(${ rgb },${ opacity })`
    })

    activeObject.canvas?.renderAll()
  }

  return (
    <div className='mt-6'>
      <p>カラー</p>
      <HexColor value={ color.hex } handle={ handleColor } />
    </div>
  )
}

export default Color