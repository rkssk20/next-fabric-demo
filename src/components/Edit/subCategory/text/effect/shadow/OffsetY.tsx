import type { Dispatch, SetStateAction } from 'react'
import { ShadowState } from '@/types/type'
import Range from '@/atoms/Range'

type Props = {
  value: ShadowState
  setValue: Dispatch<SetStateAction<ShadowState | null>>
  activeObject: fabric.Text
}

const OffsetY = ({ value, setValue, activeObject }:Props) => {
  const handleOffsetY = (number: number) => {
    setValue(prev => {
      if(!prev) return null

      return {
        ...prev,
        offsetY: number
      }
    })

    activeObject.set({
      shadow: `rgba(${ value?.rgb },${ value?.opacity }) ${ value?.offsetX }px ${ number }px ${ value?.blur }px`
    })

    activeObject.canvas?.renderAll()
  }

  return (
    <Range
      name='縦移動'
      min={ -30 }
      max={ 30 }
      value={ value.offsetY }
      handle={ handleOffsetY }
    />
  )
}

export default OffsetY