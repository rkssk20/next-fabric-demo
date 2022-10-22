import type { Dispatch, SetStateAction } from 'react'
import { ShadowState } from '@/types/type'
import Range from '@/atoms/Range'

type Props = {
  value: ShadowState
  setValue: Dispatch<SetStateAction<ShadowState | null>>
  activeObject: fabric.Text
}

const OffsetX = ({ value, setValue, activeObject }:Props) => {
  const handleOffsetX = (number: number) => {
    setValue(prev => {
      if(!prev) return null

      return {
        ...prev,
        offsetX: number
      }
    })

    activeObject.set({
      shadow: `rgba(${ value?.rgb },${ value?.opacity }) ${ number }px ${ value?.offsetY }px ${ value?.blur }px`
    })

    activeObject.canvas?.renderAll()
  }

  return (
    <Range
      name='横移動'
      min={ -30 }
      max={ 30 }
      value={ value.offsetX }
      handle={ handleOffsetX }
    />
  )
}

export default OffsetX