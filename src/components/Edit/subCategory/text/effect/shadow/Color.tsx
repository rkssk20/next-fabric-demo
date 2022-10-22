import type { Dispatch, SetStateAction } from 'react'
import { ShadowState } from '@/types/type'
import HEXtoRGB from '@/lib/HEXtoRGB'
import HexColor from '@/atoms/HexColor'

type Props = {
  value: ShadowState
  setValue: Dispatch<SetStateAction<ShadowState | null>>
  activeObject: fabric.Text
}

const Color = ({ value, setValue, activeObject }:Props) => {
  const handleColor = (e: string) => {
    const rgb = HEXtoRGB(e)

    setValue(prev => {
      if(!prev) return null

      return {
        ...prev,
        hex: e,
        rgb
      }
    })

    activeObject.set({
      shadow: `rgba(${ rgb },${ value?.opacity }) ${ value?.offsetX }px ${ value?.offsetY }px ${ value?.blur }px`
    })

    activeObject.canvas?.renderAll()
  }

  return (
    <div className='mt-6'>
      <p>カラー</p>
      <HexColor value={ value.hex } handle={ handleColor } />
    </div>
  )
}

export default Color